import { PageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { getAllWaitlistEntries } from "@/lib/admin/data";
import { formatDate } from "@/lib/utils";
import { WaitlistActions } from "@/components/admin/waitlist-actions";

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

      <DataTable
        data={entries}
        columns={[
          {
            key: "email",
            label: "Email",
            render: (entry) => (
              <div>
                <p className="font-medium text-white">{entry.email}</p>
                {entry.user && (
                  <p className="text-xs text-white/50">{entry.user.name}</p>
                )}
              </div>
            ),
          },
          {
            key: "role",
            label: "Interest",
            render: (entry) => (
              <span className="text-sm">{entry.role}</span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (entry) => (
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  entry.status === "confirmed"
                    ? "bg-green-500/20 text-green-400"
                    : entry.status === "rejected"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {entry.status}
              </span>
            ),
          },
          {
            key: "referralCode",
            label: "Referral",
            render: (entry) => (
              entry.referralCode ? (
                <span className="font-mono text-xs text-accent">{entry.referralCode}</span>
              ) : (
                <span className="text-white/40">-</span>
              )
            ),
          },
          {
            key: "consent",
            label: "Consent",
            render: (entry) => (
              <span className={entry.consent ? "text-green-400" : "text-red-400"}>
                {entry.consent ? "✓" : "✗"}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Created",
            render: (entry) => (
              <span className="text-xs">{formatDate(entry.createdAt)}</span>
            ),
          },
          {
            key: "actions",
            label: "Actions",
            render: (entry) => <WaitlistActions entry={entry} />,
          },
        ]}
      />
    </div>
  );
}
