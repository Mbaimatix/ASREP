import type { Metadata } from "next";

import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import NewsCard from "@/components/shared/NewsCard";
import { getArticleList } from "@/lib/get-news";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org/news" },
  title: "News & Media",
  description:
    "Latest news, field stories, media coverage, and research announcements from ASREP Africa's programmes across Kenya's arid and semi-arid lands.",
};

const categories = [
  { value: "all", label: "All Stories" },
  { value: "announcements", label: "Announcements" },
  { value: "climate-environment", label: "Climate & Environment" },
  { value: "peacebuilding", label: "Peacebuilding" },
  { value: "research", label: "Research" },
  { value: "partnerships", label: "Partnerships" },
  { value: "media-coverage", label: "Media Coverage" },
];

export default function NewsPage() {
  const posts = getArticleList();
  return (
    <>
      <PageHero
        title="News & Media"
        subtitle="Field stories, research announcements, media features, and programme updates from ASREP Africa."
        imageSrc="/images/news/news-hero.jpg"
        imageAlt="ASREP Africa field team conducting community engagement  -  news from the front lines"
        breadcrumbs={[{ label: "News & Media" }]}
        tag="Latest Stories"
      />

      <section className="section-pad bg-cream" aria-labelledby="news-heading">
        <div className="container-asrep">
          {/* Category filter -- client-side filtering requires a client component;
              for SSR simplicity we render all posts with an accessible filter UI */}
          <div className="mb-10">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter stories by category"
            >
              {categories.map((cat) => (
                <span
                  key={cat.value}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer border transition-colors
                    ${cat.value === "all"
                      ? "bg-forest text-white border-forest"
                      : "bg-white text-charcoal/70 border-charcoal/15 hover:border-forest/40"
                    }`}
                >
                  {cat.label}
                </span>
              ))}
            </div>
            <p className="text-muted text-xs mt-3">
              Showing all {posts.length} stories. Use category filters to narrow results.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <NewsCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                publishedAt={post.publishedAt}
                imageUrl={post.heroImage}
                imageAlt={post.heroAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Media coverage */}
      <section className="section-pad bg-white" aria-labelledby="media-coverage-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="In the Press"
            title="Media Coverage"
            titleHighlight="& Features"
            subtitle="ASREP Africa in international and national media."
            id="media-coverage-heading"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { pub: "Biographic Magazine", title: "The Future of Conservation Without US Aid", date: "2026", href: "https://www.biographic.com/the-future-of-conservation-without-us-aid/" },
              { pub: "The Guardian", title: "Conservation in the Age of Trump Aid Cuts", date: "March 2026", href: "https://www.theguardian.com/environment/2026/mar/16/conservation-trump-cuts-natural-world-usaid-funding-biodiversity-aoe" },
              { pub: "Standard Digital", title: "Isiolo Banks on Eco-Champions for Conservation", date: "2025", href: "https://www.standardmedia.co.ke/environment-climate/article/2001536345/isiolo-banks-on-eco-champions-to-empower-communities-on-conservation" },
              { pub: "People Daily Kenya", title: "ASREP's Community Conservation Gains Traction", date: "2025", href: "https://epaper.peopledaily.digital" },
            ].map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-5 p-6 bg-cream rounded-2xl border border-charcoal/8 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <p className="text-muted text-xs font-semibold uppercase tracking-widest mb-1">{item.pub} &middot; {item.date}</p>
                  <p className="font-display font-bold text-earth group-hover:text-forest transition-colors text-lg leading-snug">
                    &ldquo;{item.title}&rdquo;
                  </p>
                </div>
                <svg className="w-4 h-4 text-muted shrink-0 mt-1 group-hover:text-forest transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
