import { allBlogPosts } from "@/.contentlayer/generated";
import { Metadata } from "next";
import { BlogIndex } from "@/components/blog-index";
import { compareDesc } from "date-fns";

export const metadata: Metadata = {
  title: "Insights & lab notes",
  description:
    "Dive into hybrid-core research, Tone Lab presets, and roadmap updates from the Sirius/Serious Sound team.",
};

export default function BlogPage() {
  const posts = allBlogPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <main className="bg-[#050608]">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8">
        <header className="mb-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Lab journal</p>
          <h1 className="font-display text-4xl text-white">Blog</h1>
          <p className="max-w-2xl text-base text-zinc-300">
            Research notes, measurement breakdowns, roadmap updates, and community polls. Every post supports Giscus
            comments for transparent discussions.
          </p>
        </header>
        <BlogIndex posts={posts} />
      </div>
    </main>
  );
}
