import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://asrepafrica.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/studio/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
