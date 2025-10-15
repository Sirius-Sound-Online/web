import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Community & accounts",
  description:
    "Create an account, manage your profile, invite collaborators, and vote on the Sirius Sound roadmap.",
};

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Community</p>
          <h1 className="font-display text-4xl text-white">Shape the release with us</h1>
          <p className="max-w-3xl text-base text-zinc-300">
            Accounts unlock roadmap voting, waitlist tracking, Formbricks polls, and referral boosts. Sign in with GitHub,
            Google, or a passwordless magic link.
          </p>
        </header>
        <section className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-[#0C0F13] p-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white">Account access</h2>
            <p className="text-sm text-zinc-300">
              {session
                ? `Signed in as ${session.user?.email}. Head to your profile to tweak notifications, export roadmaps, and connect hardware.`
                : "Sign in to sync Tone Lab presets, enter the waitlist, and post under your maker handle."}
            </p>
            <Link
              href={session ? "/community/profile" : "/signin"}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent-600"
            >
              {session ? "Go to profile" : "Sign in / Join"}
            </Link>
          </div>
          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-zinc-300">
            <h3 className="text-lg font-semibold text-white">Referral queue boost</h3>
            <p>
              Invite friends and collaborators using your unique referral link. Each confirmed sign-up bumps you 2 places
              forward on the waitlist. Track performance under{" "}
              <Link href="/community/referrals" className="underline underline-offset-4">
                referrals
              </Link>
              .
            </p>
          </div>
        </section>
        <section id="roadmap" className="mt-16 space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Roadmap & feedback</p>
            <h2 className="font-display text-3xl text-white">Vote on features</h2>
            <p className="text-sm text-zinc-300">
              Cast weighted votes for pickup formats, finish options, and hardware accessories. Votes reset every sprint; we
              publish change logs in the community blog.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Loaded pickguard kit", votes: 132, status: "Now voting" },
              { title: "Active preamp module", votes: 98, status: "Research" },
              { title: "P90 mount variant", votes: 87, status: "Discovery" },
            ].map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-zinc-300"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-accent/80">{feature.status}</p>
                <p className="mt-2 text-lg font-semibold text-white">{feature.title}</p>
                <p className="mt-3 text-xs text-accent">{feature.votes} votes</p>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-16 space-y-4">
          <h2 className="font-display text-3xl text-white">Community guidelines</h2>
          <p className="text-sm text-zinc-300">
            Respect builders, share actionable feedback, and keep comparisons constructive. See full guidelines under{" "}
            <Link href="/community/guidelines" className="underline underline-offset-4">
              Community Guidelines
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
