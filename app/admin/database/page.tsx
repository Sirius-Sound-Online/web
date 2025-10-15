import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { getTableCount, TableName } from "@/lib/admin/data";

const TABLES: TableName[] = [
  "user",
  "account",
  "session",
  "verificationToken",
  "waitlistEntry",
  "order",
  "pickupSample",
  "toneLabTest",
  "toneLabRating",
];

export default async function DatabasePage() {
  const tableCounts = await Promise.all(
    TABLES.map(async (table) => ({
      name: table,
      count: await getTableCount(table),
    }))
  );

  return (
    <div>
      <PageHeader
        title="Database Browser"
        subtitle="View and manage database tables"
      />

      <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
        <h3 className="mb-2 text-lg font-semibold text-yellow-400">
          ⚠️ Caution: Database Access
        </h3>
        <p className="text-sm text-white/80">
          You have direct access to the database. Changes made here are permanent and cannot be undone.
          Always backup your data before making modifications.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tableCounts.map((table) => (
          <Link
            key={table.name}
            href={`/admin/database/${table.name}`}
            className="group rounded-2xl border border-white/10 bg-[#0C0F13] p-6 transition hover:border-accent hover:bg-accent/5"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold capitalize text-white group-hover:text-accent">
                  {table.name}
                </h3>
                <p className="mt-2 text-2xl font-bold text-accent">
                  {table.count}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {table.count === 1 ? "record" : "records"}
                </p>
              </div>

              <span className="text-2xl opacity-50 transition group-hover:opacity-100">
                🗄️
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-accent/20 px-2 py-1 text-xs text-accent">
                View
              </span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                SQLite
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Database Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/60">
              Database Type
            </p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">
              SQLite
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/60">
              Total Tables
            </p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">
              {tableCounts.length}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/60">
              Total Records
            </p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">
              {tableCounts.reduce((sum, t) => sum + t.count, 0)}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/60">
              ORM
            </p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">
              Prisma
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
