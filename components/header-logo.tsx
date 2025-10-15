"use client";

import Link from "next/link";
import Image from "next/image";

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-white/90">
      <Image
        src="/images/logo.png"
        alt="Sirius Sound"
        width={36}
        height={36}
        className="h-9 w-auto object-contain"
      />
      Sirius Sound
    </Link>
  );
}
