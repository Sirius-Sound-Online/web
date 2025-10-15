import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { testId: string } }) {
  try {
    const { testId } = params;

    // Get test with user's ratings
    const test = await prisma.toneLabTest.findUnique({
      where: { id: testId },
      include: {
        ratings: {
          include: {
            sample: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    // Calculate average ratings for each sample across all completed tests
    const results = await Promise.all(
      test.ratings.map(async (userRating) => {
        const avgRating = await prisma.toneLabRating.aggregate({
          where: {
            sampleId: userRating.sampleId,
            test: {
              completed: true,
            },
          },
          _avg: {
            rating: true,
          },
          _count: {
            rating: true,
          },
        });

        // Calculate total plays across all users for this sample
        const totalPlays = await prisma.toneLabRating.aggregate({
          where: {
            sampleId: userRating.sampleId,
            test: {
              completed: true,
            },
          },
          _sum: {
            playCount: true,
          },
        });

        return {
          sample: {
            id: userRating.sample.id,
            name: userRating.sample.name,
            guitar: userRating.sample.guitar,
            position: userRating.sample.position,
            description: userRating.sample.description,
            audioFile: userRating.sample.audioFile,
            isSirius: userRating.sample.isSirius,
          },
          userRating: userRating.rating,
          userGuess: userRating.guessedName,
          playCount: totalPlays._sum.playCount || 0,
          averageRating: avgRating._avg.rating || 0,
          totalRatings: avgRating._count.rating,
        };
      })
    );

    return NextResponse.json({
      testId: test.id,
      completed: test.completed,
      completedAt: test.completedAt,
      results,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
