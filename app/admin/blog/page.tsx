import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { getAllBlogPostSlugs, getBlogPost } from "@/lib/admin/file-operations";
import { formatDate } from "@/lib/utils";

export default async function BlogManagementPage() {
  const slugs = await getAllBlogPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getBlogPost(slug);
      return post ? { slug, ...post } : null;
    })
  );

  const validPosts = posts.filter((p) => p !== null);

  return (
    <div>
      <PageHeader
        title="Blog Management"
        subtitle={`${validPosts.length} published posts`}
        action={
          <Link
            href="/admin/blog/new"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent-600"
          >
            + New Post
          </Link>
        }
      />

      <div className="space-y-4">
        {validPosts.map((post) => (
          <div
            key={post!.slug}
            className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6 transition hover:border-accent/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">
                  {post!.frontmatter.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {post!.frontmatter.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
                    {post!.frontmatter.author}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                    {formatDate(post!.frontmatter.date)}
                  </span>
                  {post!.frontmatter.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/blog/${post!.slug}`}
                  target="_blank"
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-accent hover:text-accent"
                >
                  View
                </Link>
                <Link
                  href={`/admin/blog/edit/${post!.slug}`}
                  className="rounded-lg bg-accent/20 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/30"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}

        {validPosts.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-12 text-center">
            <p className="text-white/60">No blog posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-flex items-center gap-2 text-accent hover:underline"
            >
              Create your first post →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
