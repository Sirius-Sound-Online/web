import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Get the user session if they're logged in
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Create new test session (with userId if logged in)
    const test = await prisma.toneLabTest.create({
      data: {
        userId,
      },
    });

    return NextResponse.json({ testId: test.id, sessionId: test.sessionId });
  } catch (error) {
    console.error("Error creating test session:", error);
    return NextResponse.json({ error: "Failed to create test session" }, { status: 500 });
  }
}
