"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function UserMenu({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-expanded={open}
      >
        <span className="hidden sm:inline">{user.name ?? user.email ?? "Account"}</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
          {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "S"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#0C0F12] p-3 text-sm text-white/80 shadow-smooth"
          >
            <div className="border-b border-white/10 pb-3">
              <p className="font-semibold text-white">{user.name ?? "Member"}</p>
              <p className="text-xs text-zinc-400">{user.email}</p>
            </div>
            <nav className="mt-3 grid gap-2">
              <Link className="rounded-xl px-3 py-2 hover:bg-white/5" href="/community/profile">
                Profile
              </Link>
              <Link className="rounded-xl px-3 py-2 hover:bg-white/5" href="/community/waitlist-status">
                Waitlist status
              </Link>
              <Link className="rounded-xl px-3 py-2 hover:bg-white/5" href="/community/referrals">
                Referrals
              </Link>
            </nav>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-3 w-full rounded-xl px-3 py-2 text-left text-rose-300 hover:bg-rose-500/10"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
