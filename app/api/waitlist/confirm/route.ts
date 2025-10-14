import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const entry = await prisma.waitlistEntry.update({
      where: { confirmationToken: token },
      data: { status: "confirmed" },
    });

    const position = await prisma.waitlistEntry.count({
      where: {
        status: "confirmed",
        createdAt: { lte: entry.createdAt },
      },
    });

    if (entry.userId) {
      await prisma.user.update({
        where: { id: entry.userId },
        data: { waitlistPosition: position },
      });
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/community/waitlist-status?confirmed=${entry.id}&position=${position}`
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }
}
