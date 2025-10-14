"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type BlogPreview = {
  _id: string;
  title: string;
  excerpt: string;
  url: string;
  featureType?: string;
  date: string;
  tags?: string[];
  locale: string;
};

export function BlogIndex({ posts }: { posts: BlogPreview[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery = query
        ? post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesTag = tag ? post.tags?.includes(tag) : true;
      return matchesQuery && matchesTag;
    });
  }, [posts, query, tag]);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags ?? [])));

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts"
          className="w-full rounded-full border border-white/10 bg-black/60 px-5 py-3 text-sm text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              tag === null ? "bg-accent text-black" : "bg-white/5 text-white/70 hover:text-white"
            }`}
          >
            All tags
          </button>
          {allTags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item === tag ? null : item)}
              className={`rounded-full px-3 py-1.5 text-xs transition ${
                tag === item ? "bg-accent text-black" : "bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              #{item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post._id}
            href={post.url}
            className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-white/80 transition hover:border-accent hover:text-white"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-accent/80">
              <span>{post.featureType ?? "Article"}</span>
              <span>{formatDate(post.date, post.locale)}</span>
            </div>
            <h2 className="font-display text-2xl text-white group-hover:text-accent">{post.title}</h2>
            <p className="text-sm text-zinc-400">{post.excerpt}</p>
            <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-accent/80">
              {post.tags?.map((tagItem) => (
                <span key={tagItem} className="rounded-full border border-accent/20 px-3 py-1">
                  #{tagItem}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {!filtered.length && (
          <p className="col-span-full rounded-3xl border border-white/10 bg-[#0C0F13] p-6 text-sm text-zinc-400">
            Nothing found. Try another search term or tag.
          </p>
        )}
      </div>
    </>
  );
}
