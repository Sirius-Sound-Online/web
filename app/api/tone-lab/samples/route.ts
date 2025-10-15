import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get 1 random Sirius pickup
    const siriusPickups = await prisma.pickupSample.findMany({
      where: { active: true, isSirius: true },
      select: {
        id: true,
        name: true,
        guitar: true,
        audioFile: true,
        isSirius: true,
      },
    });

    // Get all competitor pickups
    const competitorPickups = await prisma.pickupSample.findMany({
      where: { active: true, isSirius: false },
      select: {
        id: true,
        name: true,
        guitar: true,
        audioFile: true,
        isSirius: true,
      },
    });

    if (siriusPickups.length === 0 || competitorPickups.length < 2) {
      return NextResponse.json(
        { error: "Not enough pickup samples in database" },
        { status: 500 }
      );
    }

    // Randomly select 1 Sirius pickup
    const randomSirius = siriusPickups[Math.floor(Math.random() * siriusPickups.length)];

    // Randomly select 2 competitor pickups
    const shuffledCompetitors = competitorPickups
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    // Combine and shuffle all 3 samples
    const allSamples = [randomSirius, ...shuffledCompetitors]
      .map((sample) => ({ ...sample, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ id, audioFile, name, guitar }, index) => ({
        id,
        audioFile,
        label: `Sample ${String.fromCharCode(65 + index)}`, // A, B, C
        // Store actual name and guitar for dropdown options but don't send to client yet
      }));

    // Get all possible pickup names for the dropdown (from all 15 pickups)
    const allPickupOptions = await prisma.pickupSample.findMany({
      where: { active: true },
      select: {
        name: true,
        guitar: true,
      },
      orderBy: { name: "asc" },
    });

    const pickupOptions = allPickupOptions.map((p) => ({
      value: p.name,
      label: `${p.name} (${p.guitar})`,
    }));

    return NextResponse.json({
      samples: allSamples,
      pickupOptions,
    });
  } catch (error) {
    console.error("Error fetching samples:", error);
    return NextResponse.json({ error: "Failed to fetch samples" }, { status: 500 });
  }
}
