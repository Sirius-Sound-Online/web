import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import {
  queueConfirmationEmail,
  contactCustomerEmail,
  remainingPaymentEmail,
  shippedNotificationEmail,
} from "@/lib/emails/queue-emails";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2023-10-16" });

const actionSchema = z.object({
  action: z.enum(["send_telegram", "contact", "charge_remaining", "mark_shipped", "cancel"]),
  entryId: z.string(),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { action, entryId, email } = parsed.data;

  try {
    const queueEntry = await prisma.queueEntry.findUnique({
      where: { id: entryId },
      include: { user: true },
    });

    if (!queueEntry) {
      return NextResponse.json({ error: "Queue entry not found" }, { status: 404 });
    }

    switch (action) {
      case "send_telegram": {
        const telegramUrl = process.env.TELEGRAM_CHANNEL_URL || "https://t.me/sirius_sound";
        const emailContent = queueConfirmationEmail(queueEntry.queueNumber, telegramUrl);

        if (process.env.EMAIL_FROM) {
          await sendMail({
            to: email,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }

        await prisma.queueEntry.update({
          where: { id: entryId },
          data: { telegramInviteSent: true },
        });

        return NextResponse.json({ success: true, message: "Telegram invite sent" });
      }

      case "contact": {
        const customerName = queueEntry.user?.name || "there";
        const emailContent = contactCustomerEmail(queueEntry.queueNumber, customerName);

        if (process.env.EMAIL_FROM) {
          await sendMail({
            to: email,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }

        await prisma.queueEntry.update({
          where: { id: entryId },
          data: {
            status: "contacted",
            contactedAt: new Date(),
          },
        });

        return NextResponse.json({ success: true, message: "Customer contacted" });
      }

      case "charge_remaining": {
        if (!process.env.STRIPE_SECRET_KEY) {
          return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
        }

        // First create a price, then create a payment link
        const price = await stripe.prices.create({
          currency: "usd",
          unit_amount: queueEntry.remainingAmount,
          product_data: {
            name: `Sirius Sound Pickup - Final Payment (Queue #${queueEntry.queueNumber})`,
          },
        });

        const paymentLink = await stripe.paymentLinks.create({
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          metadata: {
            queueEntryId: entryId,
            queueNumber: queueEntry.queueNumber.toString(),
            type: "queue_remaining_payment",
          },
        });

        const emailContent = remainingPaymentEmail(queueEntry.queueNumber, paymentLink.url);

        if (process.env.EMAIL_FROM) {
          await sendMail({
            to: email,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }

        // Note: Status will be updated to "confirmed" when payment succeeds via webhook
        return NextResponse.json({
          success: true,
          message: "Payment link sent",
          paymentUrl: paymentLink.url,
        });
      }

      case "mark_shipped": {
        // In a real implementation, you'd integrate with a shipping provider
        // For now, we'll use placeholder tracking info
        const trackingNumber = `SS${queueEntry.queueNumber.toString().padStart(6, "0")}`;
        const trackingUrl = `https://tracking.example.com/${trackingNumber}`;

        const emailContent = shippedNotificationEmail(
          queueEntry.queueNumber,
          trackingNumber,
          trackingUrl
        );

        if (process.env.EMAIL_FROM) {
          await sendMail({
            to: email,
            subject: emailContent.subject,
            html: emailContent.html,
          });
        }

        await prisma.queueEntry.update({
          where: { id: entryId },
          data: {
            status: "shipped",
            shippedAt: new Date(),
            notes: queueEntry.notes
              ? `${queueEntry.notes}\n\nShipped with tracking: ${trackingNumber}`
              : `Shipped with tracking: ${trackingNumber}`,
          },
        });

        return NextResponse.json({ success: true, message: "Marked as shipped" });
      }

      case "cancel": {
        await prisma.queueEntry.update({
          where: { id: entryId },
          data: { status: "cancelled" },
        });

        // Optionally send cancellation email
        if (process.env.EMAIL_FROM) {
          await sendMail({
            to: email,
            subject: `Queue Entry Cancelled - Sirius Sound (#${queueEntry.queueNumber})`,
            html: `
              <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1>Queue Entry Cancelled</h1>
                <p>Your queue entry #${queueEntry.queueNumber} has been cancelled.</p>
                <p>If you believe this was done in error, please contact us at info@sirius-sound.com</p>
              </div>
            `,
          });
        }

        return NextResponse.json({ success: true, message: "Queue entry cancelled" });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Admin queue action error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Action failed" },
      { status: 500 }
    );
  }
}
