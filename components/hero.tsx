"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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
            Sirius Sound Guitar Pickups <br className="hidden sm:block" />
            <span className="text-accent">Hyper-clarity without the hum.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-300">
              Embark on a journey through the sonic universe of Sirius Sound <b><i>where engineering meets emotion</i></b> and join a community of builders helping to ship the first production run.
          </p>
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
            <Link
              href="/join-queue"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-medium text-black transition hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Pre-Order Now
              <span className="text-sm font-normal text-black/70 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Donate to R&D
            </Link>
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 font-medium text-white/70 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Join email list
            </Link>
          </div>
          <div className="grid max-w-2xl grid-cols-2 gap-4 text-xs text-zinc-400 sm:text-sm">
            <div>
              <p className="font-semibold text-white">Core specs</p>
              <p>Inductance: 2.7 H | DC Resistance: 85.6 Ω | Capacitance: 648 nF | Magnetic Balance: 500 G | Resonant Frequency: 5.3 kHz | Q-factor: 2.14</p>
            </div>
            <div>
              <p className="font-semibold text-white">Launch window</p>
              <p>Field beta Q2 2026 → Captive OEM Q4 2026</p>
            </div>
          </div>
        </motion.div>
        <motion.figure
          className="relative flex-1 overflow-hidden rounded-2xl border-4 border-zinc-800/90 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(0,0,0,0.6)] p-4"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <div className="relative aspect-[6/7] w-full overflow-hidden rounded-lg bg-black/50">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full scale-75 object-contain"
              style={{ filter: 'contrast(1.1) saturate(0.85) brightness(0.95)' }}
            >
              <source src="/video/1017.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Old camera overlay effects */}
            <div className="pointer-events-none absolute inset-0">
              {/* Vignette effect */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />

              {/* Subtle scan lines */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                }}
              />

              {/* Film grain */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'repeat',
                }}
              />

              {/* Camera timestamp overlay */}
              <div className="absolute left-4 top-4 font-mono text-xs text-red-500/80 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
                ● REC {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
              </div>
            </div>
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-sm text-zinc-300">
            <span className="font-mono text-xs text-accent/70">WORKSHOP_CAM_01</span>
            <br />
            Handcrafted pickup assembly — Live from the Sirius Sound workshop
          </figcaption>
        </motion.figure>
      </div>
    </header>
  );
}
