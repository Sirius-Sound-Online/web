import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { QueueTable } from "@/components/admin/queue-table";
import { prisma } from "@/lib/prisma";

export default async function AdminQueuePage() {
  const queueEntries = await prisma.queueEntry.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { queueNumber: "asc" },
  });

  const stats = {
    total: queueEntries.length,
    paid: queueEntries.filter((e) => e.status === "paid").length,
    active: queueEntries.filter((e) => e.status === "active").length,
    contacted: queueEntries.filter((e) => e.status === "contacted").length,
    confirmed: queueEntries.filter((e) => e.status === "confirmed").length,
    shipped: queueEntries.filter((e) => e.status === "shipped").length,
    totalRevenue: queueEntries.reduce((sum, e) => {
      if (e.status === "confirmed" || e.status === "shipped") {
        return sum + e.depositAmount + e.remainingAmount;
      }
      return sum + e.depositAmount;
    }, 0),
    depositRevenue: queueEntries
      .filter((e) => e.status !== "pending_payment")
      .reduce((sum, e) => sum + e.depositAmount, 0),
  };

  return (
    <div>
      <PageHeader title="Queue Management" subtitle={`${stats.total} total entries`} />

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Entries" value={stats.total} icon="📋" />

        <StatCard
          title="Paid Deposits"
          value={stats.paid}
          subtitle={`$${(stats.depositRevenue / 100).toFixed(2)} collected`}
          icon="💰"
        />

        <StatCard
          title="Active/Contacted"
          value={stats.active + stats.contacted}
          subtitle={`${stats.confirmed} confirmed`}
          icon="📞"
        />

        <StatCard
          title="Shipped"
          value={stats.shipped}
          subtitle={`$${(stats.totalRevenue / 100).toFixed(2)} total revenue`}
          icon="📦"
        />
      </div>

      <QueueTable entries={queueEntries} />
    </div>
  );
}
