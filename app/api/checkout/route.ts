import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2023-10-16" });

const payloadSchema = z.object({
  email: z.string().email(),
  quantity: z.number().min(1).max(4),
  pickupFormat: z.enum(["s-style", "tele-neck", "p90"]),
});

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, quantity, pickupFormat } = parsed.data;
  const amount = 9900 * quantity;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    payment_intent_data: {
      capture_method: "manual",
      metadata: {
        pickupFormat,
        quantity,
        type: "preorder",
      },
    },
    success_url: `${process.env.NEXTAUTH_URL}/community/waitlist-status?preorder=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/preorder?cancelled=true`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 9900,
          product_data: {
            name: "Sirius Sound pre-order deposit",
            description: `Hybrid-core pickup reserve (${pickupFormat})`,
          },
        },
        quantity,
      },
    ],
  });

  await prisma.order.create({
    data: {
      type: "PREORDER",
      stripeSessionId: session.id,
      amount,
      status: "authorized",
      metadata: JSON.stringify({ pickupFormat, quantity }),
    },
  });

  return NextResponse.json({ url: session.url });
}
