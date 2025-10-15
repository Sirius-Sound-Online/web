import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedToneLab() {
  console.log("Seeding Tone Lab pickup samples...");

  // Note: Using existing audio files for demo. Replace with actual pickup recordings later.
  const samples = [
    // SIRIUS PICKUPS (3 total)
    {
      name: "Sirius Hybrid-Core Alpha",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "First-generation hybrid ferrite/neodymium core with graphene shielding. Phase-compensated windings, cryo-treated silver-plated copper.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: true,
      order: 1,
    },
    {
      name: "Sirius Hybrid-Core Beta",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Refined hybrid core design with improved magnetic field geometry. Enhanced harmonic response in mid-range frequencies.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: true,
      order: 2,
    },
    {
      name: "Sirius Hybrid-Core Gamma",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Latest iteration with optimized winding pattern and advanced core materials. Maximum clarity with vintage warmth.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: true,
      order: 3,
    },

    // COMPETITOR PICKUPS (12 total)
    {
      name: "Fender Vintage Noiseless",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Stacked-coil hum-canceling design. Alnico 5 magnets. Vintage-voiced with modern noise rejection.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: false,
      order: 4,
    },
    {
      name: "Seymour Duncan SSL-1 Vintage",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Classic single-coil tone. Alnico 5 rod magnets, plain enamel wire. Bright attack, vintage quack.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: false,
      order: 5,
    },
    {
      name: "DiMarzio Area 58",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Hum-canceling dual-coil design in single-coil size. Alnico 2 magnets. Vintage PAF-like warmth.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: false,
      order: 6,
    },
    {
      name: "Bare Knuckle Irish Tour",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Hand-wound single coil. Alnico 5 magnets, heavy Formvar wire. Enhanced mids, compressed attack.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: false,
      order: 7,
    },
    {
      name: "Lollar Vintage Blonde",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "True vintage Strat tone. Alnico 5 magnets, plain enamel wire. Sweet, warm neck pickup character.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: false,
      order: 8,
    },
    {
      name: "Suhr V60LP",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Low-output vintage single coil. Alnico 5 magnets. Clean, clear tone with excellent note definition.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: false,
      order: 9,
    },
    {
      name: "Kinman AVn-56",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Noiseless hum-canceling design with true single-coil tone. Alnico 5 magnets. Zero compromise vintage sound.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: false,
      order: 10,
    },
    {
      name: "Fralin Vintage Hot",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Overwound vintage single coil. Alnico 5 magnets. More output while maintaining vintage character.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: false,
      order: 11,
    },
    {
      name: "Mojotone '59 Clone",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Faithful recreation of 1959 Stratocaster pickups. Alnico 5 magnets, plain enamel wire. Pure vintage tone.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: false,
      order: 12,
    },
    {
      name: "EMG SA",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Active single-coil replacement. Low impedance with preamp. High output, low noise, modern clarity.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: false,
      order: 13,
    },
    {
      name: "Fishman Fluence Single Width",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Multi-voice active pickup. Two distinct tones: vintage single-coil and modern high-output. Silent operation.",
      audioFile: "/audio/standard-single-coil.wav",
      isSirius: false,
      order: 14,
    },
    {
      name: "Fender Pure Vintage '64",
      guitar: "Fender Stratocaster '62 Reissue",
      position: "Neck",
      description:
        "Vintage-correct 1964 specifications. Alnico 5 magnets, enamel-coated wire. Authentic mid-60s Strat tone.",
      audioFile: "/audio/prototype-loop.wav",
      isSirius: false,
      order: 15,
    },
  ];

  // Clear existing samples and create new ones
  await prisma.pickupSample.deleteMany({});
  await prisma.pickupSample.createMany({
    data: samples,
  });

  const siriusCount = samples.filter((s) => s.isSirius).length;
  const competitorCount = samples.filter((s) => !s.isSirius).length;

  console.log(
    `✅ Seeded ${samples.length} pickup samples (${siriusCount} Sirius, ${competitorCount} competitors)`
  );
}

seedToneLab()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
