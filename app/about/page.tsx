import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About & contact",
  description: "Meet the Sirius Sound team and learn how to get in touch about partnerships or artist demos.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">About</p>
          <h1 className="font-display text-4xl text-white">Engineering the next pickup era</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Sirius Sound is a truly distributed team. Part of our team is based in Chisinau, Moldova, while another
            part operates from Chicago, Illinois, USA. Together, we're pushing the boundaries of pickup design and
            engineering.
          </p>
        </header>
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                General:{" "}
                <Link href="mailto:info@sirius-sound.com" className="text-accent">
                  info@sirius-sound.com
                </Link>
              </li>
              <li>
                Partnerships:{" "}
                <Link href="mailto:partnerships@sirius-sound.com" className="text-accent">
                  partnerships@sirius-sound.com
                </Link>
              </li>
              <li>
                Press:{" "}
                <Link href="mailto:press@sirius-sound.com" className="text-accent">
                  press@sirius-sound.com
                </Link>
              </li>
            </ul>
          </article>
          <article className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <h2 className="text-lg font-semibold text-white">Partners</h2>
            <p>
              We co-develop pickup modules with boutique builders and OEM lines. Interested in hosting a beta rack or
              bundling our adaptive load? Reach out for the partner deck and BOM samples.
            </p>
          </article>
        </section>
        <section className="mt-16 space-y-4">
          <h2 className="font-display text-3xl text-white">Team</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Boris Tsekinovsky", role: "CEO" },
              { name: "Vladimir Tincovan", role: "Chief Engineer & Pickup Designer" },
            ].map((member) => (
              <li
                key={member.name}
                className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300"
              >
                <p className="text-lg font-semibold text-white">{member.name}</p>
                <p className="text-xs text-zinc-500">{member.role}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16 space-y-6">
          <h2 className="font-display text-3xl text-white">Join the Community</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <h3 className="text-lg font-semibold text-white">Supporters</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Help us advance pickup technology by backing our research and development. Early supporters get access
                to beta units and exclusive community forums.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <h3 className="text-lg font-semibold text-white">Contributors</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Join our open-source initiative. Whether you're into circuit design, DSP, or documentation, there's a
                place for your skills. Check our GitHub for current projects.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <h3 className="text-lg font-semibold text-white">Community</h3>
              <p className="mt-3 text-sm text-zinc-300">
                Connect with other musicians, builders, and audio enthusiasts. Share your sound experiments, ask
                questions, and help shape the future of adaptive pickups.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
