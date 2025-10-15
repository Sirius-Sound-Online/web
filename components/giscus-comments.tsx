"use client";

import Giscus from "@giscus/react";

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO ?? "Sirius-Sound-Online/web";
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements";
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

export function GiscusComments() {
  const repo = GISCUS_REPO as `${string}/${string}`;
  const repoId = GISCUS_REPO_ID;
  const category = GISCUS_CATEGORY;
  const categoryId = GISCUS_CATEGORY_ID;

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
        lang="en"
      />
    </div>
  );
}
