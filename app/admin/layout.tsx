import { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "Admin Dashboard - Sirius Sound",
  robots: "noindex, nofollow",
};

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  // Protect all admin routes
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#050608]">
      <AdminHeader user={session.user} />

      <div className="flex">
        <AdminNav />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
