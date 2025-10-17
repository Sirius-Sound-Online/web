import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2023-10-16" });

const payloadSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { email } = parsed.data;

  // Check if user already has an active queue entry
  const existingEntry = await prisma.queueEntry.findFirst({
    where: {
      email,
      status: {
        in: ["pending_payment", "paid", "active", "contacted", "confirmed"],
      },
    },
  });

  if (existingEntry) {
    return NextResponse.json(
      { error: "You already have an active queue entry", queueNumber: existingEntry.queueNumber },
      { status: 400 }
    );
  }

  // Get the next queue number
  const lastEntry = await prisma.queueEntry.findFirst({
    orderBy: { queueNumber: "desc" },
  });
  const nextQueueNumber = (lastEntry?.queueNumber ?? 0) + 1;

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    payment_intent_data: {
      capture_method: "automatic",
      metadata: {
        type: "queue_entry",
        queueNumber: nextQueueNumber.toString(),
      },
    },
    success_url: `${process.env.NEXTAUTH_URL}/queue-status?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/join-queue?cancelled=true`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 10000, // $100
          product_data: {
            name: "Sirius Sound Queue Entry",
            description: `Reserve your place in line (#${nextQueueNumber}). Includes Telegram access, pickup customization, and $100 credit toward final purchase.`,
          },
        },
        quantity: 1,
      },
    ],
  });

  // Create queue entry record
  await prisma.queueEntry.create({
    data: {
      queueNumber: nextQueueNumber,
      email,
      stripeSessionId: session.id,
      status: "pending_payment",
    },
  });

  return NextResponse.json({ url: session.url, queueNumber: nextQueueNumber });
}
