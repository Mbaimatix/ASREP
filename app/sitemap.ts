import type { MetadataRoute } from "next";

const BASE = "https://asrepafrica.org";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/about/mission-vision`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/about/history`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/about/leadership`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/about/theory-of-change`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE}/about/policies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE}/what-we-do`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/what-we-do/climate-resilience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/what-we-do/peacebuilding`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/what-we-do/research-knowledge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/what-we-do/civic-governance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/what-we-do/biodiversity`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/what-we-do/livelihoods`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/impact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/get-involved/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/get-involved/volunteer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/get-involved/partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/get-involved/careers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  { url: `${BASE}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/get-involved`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/videos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms-of-use`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

// News slugs — kept in sync with app/(site)/news/[slug]/page.tsx
const newsSlugs = [
  { slug: "waso-eco-champions-10000-trees", publishedAt: "2026-04-01" },
  { slug: "guardian-conservation-usaid", publishedAt: "2026-03-16" },
  { slug: "ksg-under-tree-national", publishedAt: "2026-02-20" },
  { slug: "biographic-future-conservation", publishedAt: "2026-01-15" },
  { slug: "ik-vault-debut-cows-women-land", publishedAt: "2025-09-30" },
  { slug: "isiolo-peace-forum-500", publishedAt: "2025-08-10" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map((item) => ({
    url: `${BASE}/news/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes];
}
