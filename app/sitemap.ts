import type { MetadataRoute } from "next";
import { readClient } from "@/sanity/lib/client";
import { ALL_NEWS_SLUGS_QUERY, ALL_IMPACT_STORY_SLUGS_QUERY } from "@/sanity/lib/queries";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asrepafrica.org";

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

// Static fallback news slugs — always in sitemap even without CMS
const staticNewsSlugs = [
  { slug: "waso-eco-champions-10000-trees", publishedAt: "2026-04-01" },
  { slug: "guardian-conservation-usaid", publishedAt: "2026-03-16" },
  { slug: "ksg-under-tree-national", publishedAt: "2026-02-20" },
  { slug: "biographic-future-conservation", publishedAt: "2026-01-15" },
  { slug: "ik-vault-debut-cows-women-land", publishedAt: "2025-09-30" },
  { slug: "isiolo-peace-forum-500", publishedAt: "2025-08-10" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let cmsNewsSlugs: { slug: string; publishedAt?: string }[] = [];
  try {
    cmsNewsSlugs = await readClient.fetch(ALL_NEWS_SLUGS_QUERY);
  } catch { /* CMS unavailable */ }

  // Merge CMS slugs with static slugs, deduplicating by slug value
  const allNewsSlugs = [...staticNewsSlugs, ...cmsNewsSlugs]
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i);

  const newsRoutes: MetadataRoute.Sitemap = allNewsSlugs.map((item) => ({
    url: `${BASE}/news/${item.slug}`,
    lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes];
}
