"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TableName } from "@/lib/admin/data";

type Props = {
  tableName: TableName;
  data: any[];
  total: number;
  page: number;
  totalPages: number;
};

export function DatabaseTableView({ tableName, data, total, page, totalPages }: Props) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-12 text-center">
        <p className="text-white/50">No records in this table</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    setEditData({ ...record });
  };

  const handleSave = async () => {
    if (!editingId) return;

    if (!confirm("Are you sure you want to update this record?")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/database", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: tableName,
          id: editingId,
          data: editData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update record");
      }

      setEditingId(null);
      setEditData({});
      router.refresh();
    } catch (error) {
      alert("Error updating record");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to DELETE this record? This action cannot be undone.")) {
      return;
    }

    if (!confirm("Final confirmation: This will PERMANENTLY delete the record.")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/database?table=${tableName}&id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete record");
      }

      router.refresh();
    } catch (error) {
      alert("Error deleting record");
      console.error(error);
    }
  };

  const renderValue = (key: string, value: any) => {
    if (value === null || value === undefined) {
      return <span className="text-white/30">NULL</span>;
    }

    if (typeof value === "boolean") {
      return <span className={value ? "text-green-400" : "text-red-400"}>{value.toString()}</span>;
    }

    if (key.toLowerCase().includes("date") || key.toLowerCase().includes("time")) {
      try {
        return new Date(value).toLocaleString();
      } catch {
        return String(value);
      }
    }

    const str = String(value);
    if (str.length > 50) {
      return (
        <span className="truncate block max-w-xs" title={str}>
          {str}
        </span>
      );
    }

    return str;
  };

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0F13]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-black/40">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70"
                  >
                    {column}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-white/70">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((record) => {
                const isEditing = editingId === record.id;

                return (
                  <tr key={record.id} className="transition hover:bg-white/5">
                    {columns.map((column) => (
                      <td key={column} className="px-4 py-3 text-sm">
                        {isEditing && column !== "id" ? (
                          <input
                            type="text"
                            value={editData[column] ?? ""}
                            onChange={(e) =>
                              setEditData({ ...editData, [column]: e.target.value })
                            }
                            className="w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-white"
                          />
                        ) : (
                          <span className={column === "id" ? "font-mono text-accent" : "text-white/80"}>
                            {renderValue(column, record[column])}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={handleSave}
                            className="rounded-lg bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 transition hover:bg-green-500/30"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white/70 transition hover:bg-white/20"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(record)}
                            className="rounded-lg bg-accent/20 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent/30"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/30"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-white/60">
            Page {page} of {totalPages} • {total} total records
          </p>

          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/database/${tableName}?page=${page - 1}`}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-accent hover:text-accent"
              >
                Previous
              </Link>
            )}

            {page < totalPages && (
              <Link
                href={`/admin/database/${tableName}?page=${page + 1}`}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-accent hover:text-accent"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
