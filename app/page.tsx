import { Hero } from "@/components/hero";
import { NarrativeSection } from "@/components/narrative-section";
import { ToneLabPreview } from "@/components/tone-lab-preview";
import { WaitlistCta } from "@/components/waitlist-cta";
import { RoadmapPreview } from "@/components/roadmap-preview";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Immersive pre-release hub",
  description:
    "Discover the Sirius Sound pickup architecture, hear the tone lab demos, and join the waitlist before launch.",
};

const story = [
  {
    heading: "Handmade Production",
    tagline: "Each pickup is individually crafted, not mass-produced.",
    copy:
      "Our queue system ensures fair ordering while we scale production. Your $100 deposit secures your place in line, gives you Telegram access for updates, and counts toward the final $550 price. Pre-orders help fund R&D and faster market entry.",
  },
  {
    heading: "Problem",
    tagline: "Conventional single coils fight hum and bandwidth trade-offs.",
    copy:
      "Producers complain about noise floors and inconsistent resonance peaks. Builders mod wax pots and magnet polarity, but the noise remains.",
  },
  {
    heading: "Our approach",
    tagline: "Hybrid-core winding with phase-stable flux management.",
    copy:
      "We modelled the pickup as an RF circuit, iterated with finite-element sims, and built a modular bobbin that keeps inductance tight while cancelling hum.",
  },
  {
    heading: "Measurements",
    tagline: "Swept sine, THD, noise floor and impedance profiling.",
    copy:
      "LCR sweeps show a 4.2H inductance with a tunable Q factor. THD stays under 0.2% at 1kHz. View the interactive charts on the Product page.",
  },
  {
    heading: "Tone demos",
    tagline: "Compare our prototype with a classic single coil instantly.",
    copy:
      "The Tone Lab streams phase-aligned loops, so you can flip A/B without loudness bias. Change cable capacitance or load to hear the response.",
  },
  {
    heading: "Roadmap",
    tagline: "From field beta to OEM partnerships.",
    copy:
      "Vote on winding recipes, request mounting formats, and track our certification milestones in the community roadmap.",
  },
];

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <Hero />
      <div className="bg-[#0B0D10]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-24">
          <section className="grid gap-12">
            {story.map((step, index) => (
              <NarrativeSection key={step.heading} index={index} {...step} />
            ))}
          </section>
          <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-zinc-900" />}>
            <ToneLabPreview />
          </Suspense>
          <RoadmapPreview />
        </div>
      </div>
      <WaitlistCta />
    </main>
  );
}
