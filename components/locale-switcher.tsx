"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" }
];

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [current, setCurrent] = useState(() => {
    const firstSegment = pathname?.split("/")[1];
    return locales.find((locale) => locale.code === firstSegment)?.code ?? "en";
  });

  const changeLocale = (code: string) => {
    setCurrent(code);
    const segments = pathname?.split("/") ?? [""];
    if (segments[1] && locales.some((locale) => locale.code === segments[1])) {
      segments[1] = code;
    } else {
      segments.splice(1, 0, code);
    }
    const nextPath = segments.join("/") || "/";
    router.push(nextPath.replace(/\/$/, ""));
  };

  return (
    <div className="flex rounded-full border border-white/15 bg-black/40 p-1 text-xs">
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => changeLocale(locale.code)}
          className={`rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            current === locale.code ? "bg-accent text-black" : "text-white/60 hover:text-white"
          }`}
          type="button"
        >
          {locale.label}
        </button>
      ))}
    </div>
  );
}
