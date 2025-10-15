"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const [url, setUrl] = useState(`https://sirius-sound.example${pathname}`);

  useEffect(() => {
    setUrl(window.location.origin + pathname);
  }, [pathname]);

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-accent hover:text-accent"
      >
        Share on X
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-accent hover:text-accent"
      >
        Share on LinkedIn
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-accent hover:text-accent"
      >
        Copy link
      </button>
    </div>
  );
}
