"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  user: User;
};

export function AdminHeader({ user }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040506]/95 backdrop-blur">
      <div className="flex items-center justify-between px-8 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Sirius Sound"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white">
              SIRIUS SOUND
            </span>
            <span className="text-xs tracking-wider text-accent">
              ADMIN DASHBOARD
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition"
          >
            ← Back to Site
          </Link>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-4 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">{user.name ?? "Admin"}</span>
              <span className="text-xs text-zinc-400">{user.email}</span>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-red-500/50 hover:text-red-400 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
