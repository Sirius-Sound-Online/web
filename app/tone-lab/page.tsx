import { Metadata } from "next";
import dynamic from "next/dynamic";

const ToneLabPlayer = dynamic(() => import("@/tone-lab/tone-lab-player"), {
  ssr: false,
  loading: () => <div className="h-80 rounded-3xl border border-white/10 bg-black/40" />,
});

export const metadata: Metadata = {
  title: "Tone Lab",
  description: "Interactive Web Audio playground with A/B demos, adaptive loads, and spectral visualisation.",
};

export default function ToneLabPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Tone lab</p>
          <h1 className="font-display text-4xl text-white">Dial the pickup response in real time</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Flip between prototype and control single coil, adjust load, and capture shareable presets. The Tone Lab runs in
            Web Audio, caches demo loops for offline rigs, and respects reduced motion preferences.
          </p>
        </header>
        <section className="mt-10">
          <ToneLabPlayer />
        </section>
        <section className="mt-16 grid gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-8 md:grid-cols-3">
          {[
            {
              title: "A/B blind switch",
              copy: "Randomise source labels and log your guesses to avoid bias.",
            },
            {
              title: "Cable + load tweaks",
              copy: "Sweep capacitance and load curves to hear resonance shifts.",
            },
            {
              title: "Export presets",
              copy: "Share tone states via URL tokens or download JSON presets.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-zinc-300">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm text-zinc-400">{item.copy}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
