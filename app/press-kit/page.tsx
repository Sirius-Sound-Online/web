import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press kit",
  description: "Logos, product renders, measurement overviews, and contact for Sirius Sound press inquiries.",
};

export default function PressKitPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Press</p>
          <h1 className="font-display text-4xl text-white">Press resources</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Download logos, macro photos, measurement charts, and boilerplate copy. For interviews contact press@sirius-sound.example.
          </p>
        </header>
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Logo pack", desc: "SVG + PNG", href: "/images/logo-light.svg" },
            { title: "Product macro", desc: "1200x1400", href: "/images/coil-macro.svg" },
            { title: "Measurement deck", desc: "PDF", href: "/docs/sirius-whitepaper-v0.pdf" },
          ].map((asset) => (
            <a
              key={asset.title}
              href={asset.href}
              className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300 transition hover:border-accent hover:text-white"
            >
              <p className="text-lg font-semibold text-white">{asset.title}</p>
              <p className="text-xs text-zinc-500">{asset.desc}</p>
            </a>
          ))}
        </section>
        <section className="mt-16 space-y-3" id="specs">
          <h2 className="font-display text-3xl text-white">Specification highlights</h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>Inductance: 4.2H ±0.03, Resonant peak: 3.4kHz (Studio preset)</li>
            <li>Noise rejection: 18dB vs single coil at 50Hz</li>
            <li>Magnets: Alnico V with neodymium assist</li>
            <li>Shielding: Graphene wrap with braided drain</li>
            <li>Adaptive load: 0.68nF–4.7nF micro load bank</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
