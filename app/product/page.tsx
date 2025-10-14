import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const MeasurementCharts = dynamic(() => import("@/components/measurement-charts"), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-3xl bg-zinc-900" />,
});

export const metadata: Metadata = {
  title: "Product & technology",
  description: "Dive into the hybrid-core architecture, measurement stacks, and deployment FAQs.",
};

const faq = [
  {
    question: "How does the hybrid-core cancel hum without killing sparkle?",
    answer:
      "Dual-phase winding with balanced inductance and an active flux path lets us cancel common-mode noise before it hits the cable while keeping the resonance peak tunable.",
  },
  {
    question: "What mounting formats ship first?",
    answer: "S-style routes (54mm/52mm) and Tele neck routes. LP format lands post-beta depending on roadmap votes.",
  },
  {
    question: "Do I need extra power?",
    answer:
      "No external power required. The adaptive load module sips micro-current from the guitar jack. Optional 9V booster adds 6dB headroom for extended range guitars.",
  },
];

export default function ProductPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sirius/Serious Sound Hybrid-Core Pickup",
    image: ["https://sirius-sound.example/images/coil-macro.svg"],
    description: "Hybrid-core guitar pickup with adaptive load and graphene shielding.",
    releaseDate: "2024-09-01",
    brand: {
      "@type": "Brand",
      name: "Sirius/Serious Sound",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "99.00",
      priceCurrency: "USD",
      url: "https://sirius-sound.example/preorder",
    },
  };

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Technology</p>
          <h1 className="font-display text-4xl text-white">Hybrid-core pickup platform</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Every Sirius pickup ships with graphene shielding, phase-stable flux routing, and an adaptive load insert. The
            goal: deliver single-coil articulation with humbucker-grade noise rejection.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/press-kit#specs"
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:text-white"
            >
              Download specs
            </Link>
            <Link
              href="/preorder"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent-600"
            >
              Pre-order with manual capture
            </Link>
          </div>
        </header>
        <section className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-[#0C0F13] p-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4 text-base text-zinc-300">
            <h2 className="font-display text-2xl text-white">Architecture white paper</h2>
            <p>
              The Sirius prototype is a three-stage system: hybrid ferrite core, differential winding, and adaptive load
              module. Finite element analysis informs winding density to keep inductance within ±0.03H, while graphene
              shielding channels eddy currents away from the audio path.
            </p>
            <p>
              The load module offers preset curves (Studio, Stage, Modern) plus custom shaping via Tone Lab. Builders can
              flash new responses over USB-C.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-sm text-zinc-400">
              <li>4-layer PCB with micro load matrix (0.68nF–4.7nF range).</li>
              <li>Dual magnet array: alnico V + neodymium assist for tight bass.</li>
              <li>RF-cancelled harness with cold-solder pads for quick swaps.</li>
            </ul>
          </div>
          <div className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-zinc-400">
            <p className="font-semibold uppercase tracking-[0.3em] text-accent">Download</p>
            <p>Read the living white paper with schematics, FEA renders, and BOM guidance.</p>
            <a
              href="/docs/sirius-whitepaper-v0.pdf"
              className="rounded-full border border-white/20 px-4 py-2 text-center text-white/80 transition hover:border-accent hover:text-accent"
            >
              PDF (EN)
            </a>
            <a
              href="/docs/sirius-whitepaper-v0-ru.pdf"
              className="rounded-full border border-white/20 px-4 py-2 text-center text-white/80 transition hover:border-accent hover:text-accent"
            >
              PDF (RU)
            </a>
          </div>
        </section>
        <section id="measurements" className="mt-16 space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-accent/80">Measurements</p>
            <h2 className="font-display text-3xl text-white">Frequency response & THD</h2>
            <p className="max-w-3xl text-base text-zinc-300">
              Measurements collected via Audio Precision APx515. Explore each trace in the interactive charts below.
            </p>
          </div>
          <MeasurementCharts />
        </section>
        <section className="mt-16 space-y-5">
          <h2 className="font-display text-3xl text-white">FAQ</h2>
          <div className="grid gap-4">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-zinc-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      </div>
    </main>
  );
}
