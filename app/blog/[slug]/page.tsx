import { allBlogPosts } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { MDXContent } from "@/components/mdx-content";
import { GiscusComments } from "@/components/giscus-comments";
import { ShareButtons } from "@/components/share-buttons";

interface Params {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = allBlogPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: post.url,
      locale: post.locale === "ru" ? "ru_RU" : "en_US",
      images: post.ogImage ? [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  } satisfies Metadata;
}

export default function BlogPostPage({ params }: Params) {
  const post = allBlogPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    description: post.excerpt,
    image: post.ogImage ?? "https://sirius-sound.example/images/og-default.png",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sirius-sound.example${post.url}`,
    },
  };

  return (
    <main className="bg-[#050608]">
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-accent/80">{post.featureType ?? "Article"}</p>
          <h1 className="font-display text-4xl text-white">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span>{post.author}</span>
            <span aria-hidden>•</span>
            <span>{formatDate(post.date, post.locale)}</span>
          </div>
        </header>
        <div className="prose prose-invert prose-lg mt-10">
          <MDXContent code={post.body.code} />
        </div>
        <div className="mt-10 rounded-3xl border border-white/10 bg-[#0C0F13] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent/80">Share</p>
          <div className="mt-3">
            <ShareButtons title={post.title} />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <GiscusComments locale={post.locale} />
      </article>
    </main>
  );
}
