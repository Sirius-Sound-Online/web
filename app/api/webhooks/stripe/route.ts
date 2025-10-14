import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

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
      await prisma.order.updateMany({
        where: { stripeSessionId: session.id },
        data: {
          status: session.payment_status ?? "pending",
          stripeIntentId: session.payment_intent as string,
        },
      });
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
