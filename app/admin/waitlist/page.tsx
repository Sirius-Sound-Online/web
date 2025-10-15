import { PageHeader } from "@/components/admin/page-header";
import { getAllWaitlistEntries } from "@/lib/admin/data";
import { WaitlistTable } from "@/components/admin/waitlist-table";

export default async function WaitlistPage() {
  const entries = await getAllWaitlistEntries();

  const pendingCount = entries.filter((e) => e.status === "pending").length;
  const confirmedCount = entries.filter((e) => e.status === "confirmed").length;

  return (
    <div>
      <PageHeader
        title="Waitlist Management"
        subtitle={`${entries.length} total entries • ${pendingCount} pending • ${confirmedCount} confirmed`}
      />

      <WaitlistTable entries={entries} />
    </div>
  );
}
