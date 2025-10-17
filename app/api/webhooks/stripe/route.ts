import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { queueConfirmationEmail } from "@/lib/emails/queue-emails";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.arrayBuffer();

  if (!secret || !process.env.STRIPE_SECRET_KEY || !signature) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(payload), signature, secret);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // Check if this is a queue entry payment
      const queueEntry = await prisma.queueEntry.findUnique({
        where: { stripeSessionId: session.id },
      });

      if (queueEntry) {
        await prisma.queueEntry.update({
          where: { id: queueEntry.id },
          data: {
            status: "paid",
            stripeIntentId: session.payment_intent as string,
          },
        });

        // Send Telegram invite email automatically
        const telegramUrl = process.env.TELEGRAM_CHANNEL_URL || "https://t.me/sirius_sound";
        const emailContent = queueConfirmationEmail(queueEntry.queueNumber, telegramUrl);

        if (process.env.EMAIL_FROM) {
          try {
            await sendMail({
              to: queueEntry.email,
              subject: emailContent.subject,
              html: emailContent.html,
            });

            await prisma.queueEntry.update({
              where: { id: queueEntry.id },
              data: { telegramInviteSent: true },
            });
          } catch (error) {
            console.error("Failed to send queue confirmation email:", error);
          }
        }
      } else {
        // Check if this is a queue remaining payment (via payment link)
        const metadata = session.metadata;
        if (metadata?.type === "queue_remaining_payment" && metadata?.queueEntryId) {
          await prisma.queueEntry.update({
            where: { id: metadata.queueEntryId },
            data: {
              status: "confirmed",
              confirmedAt: new Date(),
            },
          });
        } else {
          // Handle regular orders
          await prisma.order.updateMany({
            where: { stripeSessionId: session.id },
            data: {
              status: session.payment_status ?? "pending",
              stripeIntentId: session.payment_intent as string,
            },
          });
        }
      }
      break;
    }
    case "payment_intent.canceled": {
      const intent = event.data.object as Stripe.PaymentIntent;
      await prisma.order.updateMany({
        where: { stripeIntentId: intent.id },
        data: { status: "canceled" },
      });
      break;
    }
    case "payment_intent.amount_capturable_updated": {
      const intent = event.data.object as Stripe.PaymentIntent;
      await prisma.order.updateMany({
        where: { stripeIntentId: intent.id },
        data: { status: "capturable" },
      });
      break;
    }
    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      await prisma.order.updateMany({
        where: { stripeIntentId: intent.id },
        data: { status: "captured" },
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
