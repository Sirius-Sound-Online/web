"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogPostMetadata } from "@/lib/admin/file-operations";

type Props = {
  mode: "create" | "edit";
  slug?: string;
  initialData?: {
    frontmatter: BlogPostMetadata;
    content: string;
  };
};

export function BlogPostForm({ mode, slug, initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const [formData, setFormData] = useState({
    slug: slug || "",
    title: initialData?.frontmatter.title || "",
    excerpt: initialData?.frontmatter.excerpt || "",
    date: initialData?.frontmatter.date || new Date().toISOString().split("T")[0],
    author: initialData?.frontmatter.author || "",
    tags: initialData?.frontmatter.tags?.join(", ") || "",
    featureType: initialData?.frontmatter.featureType || "",
    heroImage: initialData?.frontmatter.heroImage || "",
    ogImage: initialData?.frontmatter.ogImage || "",
    pollId: initialData?.frontmatter.pollId || "",
    content: initialData?.content || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slug || !formData.title || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/blog", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: formData.slug,
          frontmatter: {
            title: formData.title,
            excerpt: formData.excerpt,
            date: formData.date,
            author: formData.author,
            tags: formData.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
            featureType: formData.featureType || undefined,
            heroImage: formData.heroImage || undefined,
            ogImage: formData.ogImage || undefined,
            pollId: formData.pollId || undefined,
          },
          content: formData.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      alert("Error saving blog post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!slug) return;

    if (
      !confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/blog?slug=${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      alert("Error deleting blog post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Post Details</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  disabled={mode === "edit"}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-white/40 focus:border-accent focus:outline-none disabled:opacity-50"
                  placeholder="my-blog-post"
                  required
                />
                <p className="mt-1 text-xs text-white/50">
                  URL-friendly identifier (lowercase, hyphens)
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-white/40 focus:border-accent focus:outline-none"
                  placeholder="My Awesome Blog Post"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Excerpt <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-white/40 focus:border-accent focus:outline-none"
                  placeholder="A brief description of the post..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Author <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-white/40 focus:border-accent focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-white/40 focus:border-accent focus:outline-none"
                  placeholder="research, measurements, tutorial"
                />
                <p className="mt-1 text-xs text-white/50">
                  Comma-separated tags
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Feature Type
                </label>
                <input
                  type="text"
                  value={formData.featureType}
                  onChange={(e) =>
                    setFormData({ ...formData, featureType: e.target.value })
                  }
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-white placeholder-white/40 focus:border-accent focus:outline-none"
                  placeholder="Research, Tutorial, etc."
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Content <span className="text-red-400">*</span>
            </h3>

            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2 font-mono text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none"
              placeholder="Write your MDX content here..."
              rows={20}
              required
            />

            <p className="mt-2 text-xs text-white/50">
              Supports MDX syntax. Use components like &lt;BlogImage&gt;,
              &lt;BlogVideo&gt;, etc.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-accent px-6 py-3 font-semibold text-black transition hover:bg-accent-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : mode === "create" ? "Create Post" : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="rounded-lg border border-white/10 px-6 py-3 font-medium text-white transition hover:border-accent hover:text-accent"
            >
              {preview ? "Hide" : "Show"} Preview
            </button>

            {mode === "edit" && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-lg border border-red-500/50 px-6 py-3 font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Preview</h3>

        {preview ? (
          <div className="prose prose-invert max-w-none">
            <h1>{formData.title}</h1>
            <p className="text-zinc-400">{formData.excerpt}</p>
            <div className="mt-6 whitespace-pre-wrap text-sm text-zinc-300">
              {formData.content}
            </div>
          </div>
        ) : (
          <p className="text-center text-white/50">
            Click "Show Preview" to see how your post will look
          </p>
        )}
      </div>
    </div>
  );
}
