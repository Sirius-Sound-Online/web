"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[73px] h-[calc(100vh-73px)] w-64 border-r border-white/10 bg-[#0C0F12] p-6">
      <ul className="space-y-2">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
        <p className="text-xs font-semibold text-yellow-400">⚠️ Admin Access</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          You have full control over the system. Use caution when modifying data.
        </p>
      </div>
    </nav>
  );
}
