"use client";

import { motion } from "framer-motion";

type Props = {
  heading: string;
  tagline: string;
  copy: string;
  index: number;
};

export function NarrativeSection({ heading, tagline, copy, index }: Props) {
  return (
    <motion.article
      className="grid gap-4 rounded-3xl border border-white/5 bg-[#0F1216]/70 p-6 shadow-sm backdrop-blur md:grid-cols-[220px,1fr] md:gap-8 md:p-10"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.4em] text-accent">{heading}</p>
        <p className="font-display text-xl text-white md:text-2xl">{tagline}</p>
      </div>
      <p className="text-base text-zinc-300">{copy}</p>
    </motion.article>
  );
}
