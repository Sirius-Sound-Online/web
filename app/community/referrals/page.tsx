import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function ReferralsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const code = (session.user.id ?? "pending").slice(0, 8);
  const referrals: Array<{ id: string; status: string; createdAt: Date }> = [];

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Referrals</p>
          <h1 className="font-display text-3xl text-white">Waitlist boost</h1>
          <p className="text-sm text-zinc-400">Share your link. Every confirmed signup bumps you forward by two spots.</p>
        </header>
        <section className="mt-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Your link</p>
            <code className="mt-2 block rounded-2xl bg-black/60 p-4 text-accent">
              https://sirius-sound.example/join?ref={code}
            </code>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Activity</p>
            {referrals.length ? (
              <ul className="mt-3 space-y-2">
                {referrals.map((referral) => (
                  <li key={referral.id} className="flex items-center justify-between">
                    <span>{referral.id}</span>
                    <span className="text-xs text-zinc-500">
                      {referral.status} • {new Date(referral.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-zinc-400">No referrals yet. Share your link to climb the queue.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
