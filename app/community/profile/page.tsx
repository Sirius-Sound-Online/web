import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const waitlistEntry = await prisma.waitlistEntry.findFirst({
    where: {
      OR: [{ userId: session.user.id }, { email: session.user.email ?? undefined }],
    },
    orderBy: { createdAt: "asc" },
  });

  let position: number | null = null;
  if (waitlistEntry) {
    position = await prisma.waitlistEntry.count({
      where: {
        status: "confirmed",
        createdAt: { lte: waitlistEntry.createdAt },
      },
    });
  }

  const queueEntry = await prisma.queueEntry.findFirst({
    where: {
      OR: [{ userId: session.user.id }, { email: session.user.email ?? undefined }],
      status: {
        in: ["paid", "active", "contacted", "confirmed"],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/70">Profile</p>
          <h1 className="font-display text-3xl text-white">Account settings</h1>
          <p className="text-sm text-zinc-400">Update waitlist preferences and notification cadence.</p>
        </header>
        <section className="mt-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Identity</p>
            <p className="mt-2 text-lg font-semibold text-white">{session.user.email}</p>
            <p className="mt-1 text-xs text-zinc-500">Member role: {session.user.role ?? "member"}</p>
          </div>

          {queueEntry && (
            <div className="rounded-3xl border border-accent/30 bg-accent/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Queue Position</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-display text-4xl text-white">#{queueEntry.queueNumber}</p>
                  <p className="mt-1 text-xs capitalize text-zinc-400">
                    Status: {queueEntry.status.replace("_", " ")}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-zinc-400">Deposit Paid</p>
                  <p className="font-semibold text-white">${(queueEntry.depositAmount / 100).toFixed(2)}</p>
                  <p className="mt-2 text-zinc-400">Remaining</p>
                  <p className="font-semibold text-white">${(queueEntry.remainingAmount / 100).toFixed(2)}</p>
                </div>
              </div>
              {queueEntry.pickupConfig ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Your Configuration</p>
                  <pre className="mt-2 text-xs text-zinc-300">{queueEntry.pickupConfig}</pre>
                </div>
              ) : (
                <p className="mt-4 text-xs text-zinc-400">
                  Configuration not set yet. You can customize your pickup anytime before production starts.
                </p>
              )}
            </div>
          )}

          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
            <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Waitlist status</p>
            {waitlistEntry ? (
              <ul className="mt-2 space-y-2">
                <li>Position: {position ?? "pending"}</li>
                <li>Role: {waitlistEntry.role}</li>
                <li>Status: {waitlistEntry.status}</li>
                <li>Joined: {new Date(waitlistEntry.createdAt).toLocaleDateString()}</li>
              </ul>
            ) : (
              <p className="mt-2 text-zinc-400">No waitlist entry yet. Join via the homepage CTA.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
