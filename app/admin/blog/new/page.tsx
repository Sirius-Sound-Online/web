import { PageHeader } from "@/components/admin/page-header";
import { BlogPostForm } from "@/components/admin/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <PageHeader
        title="Create New Blog Post"
        subtitle="Write and publish a new blog post"
      />

      <BlogPostForm mode="create" />
    </div>
  );
}
