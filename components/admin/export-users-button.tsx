"use client";

import { UserWithRelations } from "@/lib/admin/data";

type Props = {
  users: UserWithRelations[];
};

export function ExportUsersButton({ users }: Props) {
  const handleExport = () => {
    // Prepare CSV data
    const headers = ["Name", "Email", "Role", "Waitlist Position", "OAuth Providers", "Total Orders", "Total Spent", "Joined Date"];

    const rows = users.map((user) => [
      user.name ?? "",
      user.email ?? "",
      user.role,
      user.waitlistPosition?.toString() ?? "",
      user.accounts.map((a) => a.provider).join("; "),
      user.orders.length.toString(),
      (user.orders.reduce((sum, o) => sum + o.amount, 0) / 100).toFixed(2),
      new Date(user.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `community-members-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent-600"
    >
      Export to CSV
    </button>
  );
}
