import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Create new anonymous test session
    const test = await prisma.toneLabTest.create({
      data: {},
    });

    return NextResponse.json({ testId: test.id, sessionId: test.sessionId });
  } catch (error) {
    console.error("Error creating test session:", error);
    return NextResponse.json({ error: "Failed to create test session" }, { status: 500 });
  }
}
