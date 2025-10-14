"use client";

import Giscus from "@giscus/react";

export function GiscusComments({ locale = "en" }: { locale?: string }) {
  const repo = (process.env.NEXT_PUBLIC_GISCUS_REPO ?? "Sirius-Sound-Online/web") as `${string}/${string}`;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements";
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

  return (
    <div className="mt-12 rounded-3xl border border-white/10 bg-[#0B0E12] p-6">
      <Giscus
        id="comments"
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang={locale}
      />
    </div>
  );
}
