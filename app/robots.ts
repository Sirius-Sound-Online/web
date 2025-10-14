import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/community/profile", "/community/referrals"],
      },
    ],
    sitemap: "https://sirius-sound.example/sitemap.xml",
  };
}
