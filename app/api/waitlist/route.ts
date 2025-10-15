import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { z } from "zod";
import crypto from "node:crypto";

const payloadSchema = z.object({
  email: z.string().email(),
  role: z.enum(["player", "producer", "luthier", "engineer", "retailer", "partner"]),
  consent: z.boolean(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { email, role, consent } = parsed.data;
  if (!consent) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const token = crypto.randomBytes(24).toString("hex");
  await prisma.waitlistEntry.create({
    data: {
      email,
      role,
      consent,
      confirmationToken: token,
    },
  });

  if (process.env.EMAIL_FROM) {
    await sendMail({
      to: email,
      subject: "Confirm your Sirius Sound waitlist spot",
      html: `<p>Thanks for joining. Confirm your email:</p><p><a href="${process.env.NEXTAUTH_URL}/api/waitlist/confirm?token=${token}">Confirm spot</a></p>`
    });
  }

  return NextResponse.json({ ok: true });
}
