"use client";

import { ReactNode } from "react";

type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  emptyMessage = "No data available",
}: Props<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-12 text-center">
        <p className="text-white/50">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0F13]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-black/40">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/70"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`transition ${onRowClick ? "cursor-pointer hover:bg-white/5" : ""}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-white/80"
                  >
                    {column.render
                      ? column.render(item)
                      : item[column.key]?.toString() ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
