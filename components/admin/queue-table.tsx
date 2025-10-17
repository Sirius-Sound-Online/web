"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { formatDate } from "@/lib/utils";

type QueueEntry = {
  id: string;
  queueNumber: number;
  email: string;
  status: string;
  depositAmount: number;
  remainingAmount: number;
  telegramUsername: string | null;
  telegramInviteSent: boolean;
  createdAt: Date;
  contactedAt: Date | null;
  confirmedAt: Date | null;
  shippedAt: Date | null;
  user: {
    name: string | null;
    email: string | null;
  } | null;
};

type Props = {
  entries: QueueEntry[];
};

export function QueueTable({ entries }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: string, entryId: string, email: string) => {
    setLoading(entryId);
    try {
      const response = await fetch("/api/admin/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, entryId, email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Action failed");
      }

      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Action failed");
    } finally {
      setLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-blue-500/20 text-blue-400";
      case "active":
        return "bg-cyan-500/20 text-cyan-400";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400";
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "shipped":
        return "bg-emerald-500/20 text-emerald-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-zinc-500/20 text-zinc-400";
    }
  };

  return (
    <DataTable
      data={entries}
      columns={[
        {
          key: "queueNumber",
          label: "#",
          render: (entry) => (
            <span className="font-mono text-lg font-bold text-accent">#{entry.queueNumber}</span>
          ),
        },
        {
          key: "user",
          label: "Customer",
          render: (entry) => (
            <div>
              <p className="font-medium text-white">{entry.user?.name ?? "No name"}</p>
              <p className="text-xs text-white/50">{entry.email}</p>
              {entry.telegramUsername && (
                <p className="text-xs text-blue-400">@{entry.telegramUsername}</p>
              )}
            </div>
          ),
        },
        {
          key: "status",
          label: "Status",
          render: (entry) => (
            <div className="space-y-1">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(entry.status)}`}>
                {entry.status.replace("_", " ")}
              </span>
              {entry.telegramInviteSent && (
                <p className="text-xs text-green-400">✓ Telegram sent</p>
              )}
            </div>
          ),
        },
        {
          key: "amounts",
          label: "Amounts",
          render: (entry) => (
            <div className="font-mono text-xs">
              <p className="text-green-400">Deposit: ${(entry.depositAmount / 100).toFixed(2)}</p>
              <p className="text-white/60">Remaining: ${(entry.remainingAmount / 100).toFixed(2)}</p>
            </div>
          ),
        },
        {
          key: "dates",
          label: "Dates",
          render: (entry) => (
            <div className="space-y-1 text-xs">
              <p className="text-white/60">Joined: {formatDate(entry.createdAt)}</p>
              {entry.contactedAt && <p className="text-yellow-400">Contacted: {formatDate(entry.contactedAt)}</p>}
              {entry.confirmedAt && <p className="text-green-400">Confirmed: {formatDate(entry.confirmedAt)}</p>}
              {entry.shippedAt && <p className="text-emerald-400">Shipped: {formatDate(entry.shippedAt)}</p>}
            </div>
          ),
        },
        {
          key: "actions",
          label: "Actions",
          render: (entry) => (
            <div className="flex flex-col gap-2">
              {entry.status === "paid" && (
                <button
                  onClick={() => handleAction("send_telegram", entry.id, entry.email)}
                  disabled={loading === entry.id}
                  className="rounded bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/30 disabled:opacity-50"
                >
                  {entry.telegramInviteSent ? "Resend Telegram" : "Send Telegram"}
                </button>
              )}
              {(entry.status === "paid" || entry.status === "active") && (
                <button
                  onClick={() => handleAction("contact", entry.id, entry.email)}
                  disabled={loading === entry.id}
                  className="rounded bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400 hover:bg-yellow-500/30 disabled:opacity-50"
                >
                  Contact Customer
                </button>
              )}
              {entry.status === "contacted" && (
                <button
                  onClick={() => handleAction("charge_remaining", entry.id, entry.email)}
                  disabled={loading === entry.id}
                  className="rounded bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 hover:bg-green-500/30 disabled:opacity-50"
                >
                  Charge $450
                </button>
              )}
              {entry.status === "confirmed" && (
                <button
                  onClick={() => handleAction("mark_shipped", entry.id, entry.email)}
                  disabled={loading === entry.id}
                  className="rounded bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50"
                >
                  Mark Shipped
                </button>
              )}
              {(entry.status === "paid" || entry.status === "active" || entry.status === "contacted") && (
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to cancel this queue entry?")) {
                      handleAction("cancel", entry.id, entry.email);
                    }
                  }}
                  disabled={loading === entry.id}
                  className="rounded bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          ),
        },
      ]}
    />
  );
}
