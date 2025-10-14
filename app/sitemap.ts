import type { MetadataRoute } from "next";
import { allBlogPosts } from "@/.contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sirius-sound.example";
  const staticPaths = [
    "",
    "/product",
    "/tone-lab",
    "/blog",
    "/community",
    "/preorder",
    "/donate",
    "/press-kit",
    "/about",
    "/privacy",
    "/terms",
  ];

  const routes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`.replace(/\/$/, ""),
    lastModified: new Date(),
  }));

  const posts = allBlogPosts.map((post) => ({
    url: `${base}${post.url}`,
    lastModified: new Date(post.date),
  }));

  return [...routes, ...posts];
}
