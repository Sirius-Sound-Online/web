import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getBlogPost } from "@/lib/admin/file-operations";

type Props = {
  params: {
    slug: string;
  };
};

export default async function EditBlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Blog Post"
        subtitle={`Editing: ${post.frontmatter.title}`}
      />

      <BlogPostForm
        mode="edit"
        slug={params.slug}
        initialData={{
          frontmatter: post.frontmatter,
          content: post.content,
        }}
      />
    </div>
  );
}
