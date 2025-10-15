import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testId, sampleId, rating, guessedName, playCount } = body;

    if (!testId || !sampleId || rating === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: testId, sampleId, rating" },
        { status: 400 }
      );
    }

    // Verify test exists
    const test = await prisma.toneLabTest.findUnique({
      where: { id: testId },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Upsert rating (update if exists, create if not)
    const ratingRecord = await prisma.toneLabRating.upsert({
      where: {
        testId_sampleId: {
          testId,
          sampleId,
        },
      },
      update: {
        rating,
        guessedName,
        playCount: playCount || 0,
      },
      create: {
        testId,
        sampleId,
        rating,
        guessedName,
        playCount: playCount || 0,
      },
    });

    return NextResponse.json({ success: true, rating: ratingRecord });
  } catch (error) {
    console.error("Error saving rating:", error);
    return NextResponse.json({ error: "Failed to save rating" }, { status: 500 });
  }
}
