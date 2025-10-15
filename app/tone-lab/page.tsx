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
          <h1 className="font-display text-4xl text-white">Can you identify the Sirius pickup?</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Listen to three neck pickup recordings on the same guitar. One is a Sirius hybrid-core pickup, the other two are from leading competitors. Rate each sample, make your guess, and see how your ears compare to the community. All samples are played through identical signal chains for a fair comparison.
          </p>
        </header>
        <section className="mt-10">
          <ToneLabPlayer />
        </section>
      </div>
    </main>
  );
}
