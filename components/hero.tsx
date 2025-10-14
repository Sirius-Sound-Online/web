"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroParticles = dynamic(() => import("./hero-particles"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-3xl bg-gradient-to-br from-[#0b1a21] to-[#05080c]" />,
});

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-br from-black via-[#0C1117] to-[#050708]">
      <div className="absolute inset-0 opacity-70">
        <HeroParticles />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-32 pt-28 sm:px-8 lg:flex-row lg:items-center lg:gap-24 lg:py-32">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Pre-release hub
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sirius/Serious Sound pickups. <br className="hidden sm:block" />
            <span className="text-accent">Hyper-clarity without the hum.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-300">
            Explore the hybrid-core architecture, dive into spectrum plots, compare A/B demos, and join a community of
            builders helping to ship the first production run.
          </p>
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
            <Link
              href="/preorder"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-medium text-black transition hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Pre-order (auth hold)
              <span className="text-sm font-normal text-black/70 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Support the build
            </Link>
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 font-medium text-white/70 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Join waitlist
            </Link>
          </div>
          <div className="grid max-w-2xl grid-cols-2 gap-4 text-xs text-zinc-400 sm:text-sm">
            <div>
              <p className="font-semibold text-white">Core specs</p>
              <p>Inductance 4.2H ±0.03, matched coils, SC hum rejection 18dB</p>
            </div>
            <div>
              <p className="font-semibold text-white">Launch window</p>
              <p>Field beta Q3 → Captive OEM Q4</p>
            </div>
          </div>
        </motion.div>
        <motion.figure
          className="relative flex-1 overflow-hidden rounded-3xl border border-white/5 bg-black/40 shadow-smooth"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <Image
            src="/images/coil-macro.svg"
            alt="Macro shot of the Sirius hybrid-core winding"
            width={1200}
            height={1400}
            priority
            className="h-full w-full object-cover opacity-90"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 text-sm text-zinc-300">
            Hybrid-core coil with graphene-infused shield, captured at 4:1 macro.
          </figcaption>
        </motion.figure>
      </div>
    </header>
  );
}
