import Link from "next/link";
import { formatDate } from "@/lib/utils";

const milestones = [
  {
    title: "Field beta pickups shipped",
    date: "2024-07-15",
    status: "In QA",
    description: "20 pre-production sets undergoing live testing with studio players across EU and US.",
  },
  {
    title: "Firmware-configurable load box",
    date: "2024-08-01",
    status: "Planned",
    description: "Launch digital load box for Tone Lab integration with DAWs and live rigs.",
  },
  {
    title: "OEM partner onboarding",
    date: "2024-09-10",
    status: "Research",
    description: "Finalize mounting SKUs and compliance docs for first OEM batch.",
  },
];

export function RoadmapPreview() {
  return (
    <section className="rounded-3xl border border-white/5 bg-[#0b0f14] p-8 shadow-smooth">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Roadmap & Feedback</p>
          <h2 className="font-display text-3xl text-white">Shape the launch with targeted votes.</h2>
        </div>
        <Link
          href="/community#roadmap"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View roadmap
          <span aria-hidden>→</span>
        </Link>
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {milestones.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-accent">
              {item.status}
              <span>{formatDate(item.date)}</span>
            </div>
            <p className="font-display text-xl text-white">{item.title}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
