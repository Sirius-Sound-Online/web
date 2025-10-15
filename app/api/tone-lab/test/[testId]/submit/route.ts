import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { testId: string } }) {
  try {
    const { testId } = params;

    // Mark test as completed
    const test = await prisma.toneLabTest.update({
      where: { id: testId },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, test });
  } catch (error) {
    console.error("Error submitting test:", error);
    return NextResponse.json({ error: "Failed to submit test" }, { status: 500 });
  }
}
