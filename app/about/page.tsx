import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About & contact",
  description: "Meet the Sirius/Serious Sound team and learn how to get in touch about partnerships or artist demos.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">About</p>
          <h1 className="font-display text-4xl text-white">Engineering the next pickup era</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Sirius/Serious Sound is a distributed team of pickup designers, circuit modelers, and touring guitar techs. We
            prototype in Budapest, test in Berlin and Nashville, and assemble production units in Katowice.
          </p>
        </header>
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                General:{" "}
                <Link href="mailto:hello@sirius-sound.example" className="text-accent">
                  hello@sirius-sound.example
                </Link>
              </li>
              <li>
                Partnerships:{" "}
                <Link href="mailto:partners@sirius-sound.example" className="text-accent">
                  partners@sirius-sound.example
                </Link>
              </li>
              <li>
                Press:{" "}
                <Link href="mailto:press@sirius-sound.example" className="text-accent">
                  press@sirius-sound.example
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
          <ul className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Elena Kovacs", role: "Lead pickup engineer" },
              { name: "Ilya Martynov", role: "DSP & Web Audio" },
              { name: "Dana Brooks", role: "Community & artist relations" },
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
      </div>
    </main>
  );
}
