import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: {
    confirmed?: string;
    position?: string;
  };
};

export default async function WaitlistStatusPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const entries = await prisma.waitlistEntry.findMany({
    where: {
      OR: [{ userId: session.user.id }, { email: session.user.email ?? undefined }],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Waitlist</p>
          <h1 className="font-display text-3xl text-white">Progress tracker</h1>
          <p className="text-sm text-zinc-400">Monitor status updates, deposits, and shipment batches.</p>
        </header>
        {searchParams.confirmed && (
          <div className="mt-6 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Thanks for confirming! Current projected position: {searchParams.position ?? "pending"}.
          </div>
        )}
        <section className="mt-8 space-y-4">
          {entries.length ? (
            <ul className="space-y-3">
              {entries.map((entry) => (
                <li key={entry.id} className="rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-300">
                  <div className="flex items-center justify-between">
                    <p className="text-white">{entry.role}</p>
                    <span className="text-xs text-zinc-500">{new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-accent/80">Status: {entry.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-400">No waitlist data yet. Join the list from the home page.</p>
          )}
        </section>
      </div>
    </main>
  );
}
