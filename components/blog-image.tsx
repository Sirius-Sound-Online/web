"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export default function BlogImage({ src, alt, caption }: Props) {
  return (
    <figure className="my-8 space-y-4">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={720}
        className="w-full rounded-3xl border border-white/10 bg-black/40"
      />
      {caption && <figcaption className="text-sm text-zinc-400">{caption}</figcaption>}
    </figure>
  );
}
