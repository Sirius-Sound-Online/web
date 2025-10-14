import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2023-10-16" });

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const { amount } = await request.json();
  if (typeof amount !== "number" || amount < 500) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_intent_data: {
      capture_method: "automatic",
      metadata: {
        type: "donation",
      },
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Sirius/Serious Sound donation" },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/donate?status=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/donate?status=cancelled`,
  });

  await prisma.order.create({
    data: {
      type: "DONATION",
      stripeSessionId: session.id,
      amount,
      status: "pending",
    },
  });

  return NextResponse.json({ url: session.url });
}
