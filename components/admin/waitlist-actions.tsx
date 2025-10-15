"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Entry = {
  id: string;
  status: string;
};

type Props = {
  entry: Entry;
};

export function WaitlistActions({ entry }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (!confirm(`Are you sure you want to mark this entry as ${newStatus}?`)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/waitlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: entry.id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update waitlist entry");
      }

      router.refresh();
    } catch (error) {
      alert("Error updating waitlist entry");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (entry.status === "confirmed") {
    return <span className="text-xs text-green-400">Confirmed ✓</span>;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleStatusChange("confirmed")}
        disabled={loading}
        className="rounded-lg bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 transition hover:bg-green-500/30 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={() => handleStatusChange("rejected")}
        disabled={loading}
        className="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/30 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
