"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SpectrumCanvas = dynamic(() => import("./tone-spectrum"), {
  ssr: false,
  loading: () => <div className="h-48 w-full rounded-2xl bg-zinc-900" />,
});

export function ToneLabPreview() {
  return (
    <section className="grid gap-10 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0b1116] to-[#050709] p-8 shadow-smooth lg:grid-cols-[3fr,2fr] lg:p-12">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Tone Lab</p>
        <h2 className="font-display text-3xl text-white md:text-4xl">Hear the spectrum shift in real time.</h2>
        <p className="text-base text-zinc-300">
          Flip between our prototype and a control single coil with phase-safe alignment. Adjust pickup height,
          capacitive load, and hear the resonance peak glide without adding hum. Spectrum frames sync to URL state, so
          you can share exact settings with collaborators.
        </p>
        <ul className="grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
          <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-white/80">
            Offline-ready via PWA caching for mobile rigs.
          </li>
          <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-white/80">
            Live spectrum + waveform overlay with Web Audio analyser.
          </li>
          <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-white/80">
            A/B latch + blind mode to avoid confirmation bias.
          </li>
          <li className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-white/80">
            URL share tokens and session history playback.
          </li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tone-lab"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Launch Tone Lab
            <span aria-hidden>↗</span>
          </Link>
          <Link
            href="/product#measurements"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Measurement data
          </Link>
        </div>
      </div>
      <motion.div
        className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SpectrumCanvas />
        <dl className="mt-6 grid grid-cols-2 gap-4 text-xs text-zinc-400">
          <div>
            <dt className="font-semibold text-white">Prototype resonance</dt>
            <dd>3.4 kHz @ -1.2 dB</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Control coil resonance</dt>
            <dd>4.7 kHz @ -3.8 dB</dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}
