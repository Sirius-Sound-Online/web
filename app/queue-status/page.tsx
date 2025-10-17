import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Queue Status",
  description: "Check your Sirius Sound queue position and status",
};

export default async function QueueStatusPage({ searchParams }: { searchParams: { success?: string } }) {
  const session = await getServerSession(authOptions);
  const showSuccess = searchParams.success === "true";

  let queueEntry = null;
  if (session?.user?.email) {
    queueEntry = await prisma.queueEntry.findFirst({
      where: {
        email: session.user.email,
        status: {
          in: ["paid", "active", "contacted", "confirmed"],
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        {showSuccess && (
          <div className="mb-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
            <div className="mb-4 text-5xl">✅</div>
            <h1 className="mb-2 font-display text-3xl text-white">Payment Successful!</h1>
            <p className="text-zinc-300">
              Your queue entry has been confirmed. Check your email for your Telegram invite link.
            </p>
          </div>
        )}

        {queueEntry ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-8">
              <div className="mb-6 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Your Queue Position</p>
                <p className="mt-2 font-display text-6xl text-white">#{queueEntry.queueNumber}</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Status:{" "}
                  <span className="font-semibold capitalize text-white">
                    {queueEntry.status.replace("_", " ")}
                  </span>
                </p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Deposit Paid</span>
                  <span className="font-semibold text-white">${(queueEntry.depositAmount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Remaining Balance</span>
                  <span className="font-semibold text-white">${(queueEntry.remainingAmount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Joined Queue</span>
                  <span className="font-semibold text-white">{new Date(queueEntry.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">What's Next?</h2>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <span className="text-accent">1.</span>
                  <span>Check your email for your private Telegram channel invite</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">2.</span>
                  <span>
                    Visit your{" "}
                    <Link href="/community/profile" className="text-accent underline">
                      profile
                    </Link>{" "}
                    to customize your pickup configuration
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">3.</span>
                  <span>Watch for updates in Telegram as your position advances</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">4.</span>
                  <span>We'll contact you when your turn approaches to confirm your order</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                href="/community/profile"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-semibold text-black transition hover:bg-accent/90"
              >
                View Your Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#0C0F13] p-8 text-center">
            <p className="mb-4 text-zinc-300">
              {session ? "You don't have an active queue entry yet." : "Sign in to check your queue status."}
            </p>
            <Link
              href={session ? "/join-queue" : "/api/auth/signin"}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-semibold text-black transition hover:bg-accent/90"
            >
              {session ? "Join the Queue" : "Sign In"}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
