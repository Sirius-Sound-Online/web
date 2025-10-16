import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { DatabaseTableView } from "@/components/admin/database-table-view";
import { getTableData, TableName } from "@/lib/admin/data";

type Props = {
  params: {
    table: string;
  };
  searchParams: {
    page?: string;
  };
};

const VALID_TABLES: TableName[] = [
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

export default async function DatabaseTablePage({ params, searchParams }: Props) {
  const tableName = params.table as TableName;

  if (!VALID_TABLES.includes(tableName)) {
    notFound();
  }

  const page = parseInt(searchParams.page || "1", 10);
  const result = await getTableData(tableName, page, 50);

  return (
    <div>
      <PageHeader
        title={`Table: ${String(tableName)}`}
        subtitle={`Viewing ${result.total} records`}
        action={
          <Link
            href="/admin/database"
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
          >
            ← Back to Tables
          </Link>
        }
      />

      <DatabaseTableView
        tableName={tableName}
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}
