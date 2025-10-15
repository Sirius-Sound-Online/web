"use client";

import { DataTable } from "@/components/admin/data-table";
import { UserWithRelations } from "@/lib/admin/data";
import { formatDate } from "@/lib/utils";

type Props = {
  users: UserWithRelations[];
};

export function CommunityTable({ users }: Props) {
  return (
    <DataTable
      data={users}
      columns={[
        {
          key: "name",
          label: "Name",
          render: (user) => (
            <div>
              <p className="font-medium text-white">{user.name ?? "No name"}</p>
              <p className="text-xs text-white/50">{user.email ?? "No email"}</p>
            </div>
          ),
        },
        {
          key: "role",
          label: "Role",
          render: (user) => (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                user.role === "admin"
                  ? "bg-purple-500/20 text-purple-400"
                  : user.role === "moderator"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-zinc-500/20 text-zinc-400"
              }`}
            >
              {user.role}
            </span>
          ),
        },
        {
          key: "accounts",
          label: "OAuth Provider",
          render: (user) => (
            <div className="flex flex-wrap gap-1">
              {user.accounts.map((account) => (
                <span
                  key={account.provider}
                  className="inline-flex rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent"
                >
                  {account.provider}
                </span>
              ))}
              {user.accounts.length === 0 && (
                <span className="text-xs text-white/40">None</span>
              )}
            </div>
          ),
        },
        {
          key: "waitlistPosition",
          label: "Waitlist",
          render: (user) =>
            user.waitlistPosition ? (
              `#${user.waitlistPosition}`
            ) : (
              <span className="text-white/40">-</span>
            ),
        },
        {
          key: "orders",
          label: "Orders",
          render: (user) => (
            <div className="text-xs">
              <span className="font-medium text-white">{user.orders.length}</span>
              {user.orders.length > 0 && (
                <span className="ml-1 text-white/50">
                  ($
                  {(
                    user.orders.reduce((sum, o) => sum + o.amount, 0) / 100
                  ).toFixed(2)}
                  )
                </span>
              )}
            </div>
          ),
        },
        {
          key: "createdAt",
          label: "Joined",
          render: (user) => <span className="text-xs">{formatDate(user.createdAt)}</span>,
        },
      ]}
    />
  );
}
