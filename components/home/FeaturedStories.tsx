import Link from "next/link";
import Image from "next/image";
import { readClient } from "@/sanity/lib/client";
import { NEWS_FEATURED_QUERY } from "@/sanity/lib/queries";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(readClient);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const categoryColour: Record<string, string> = {
  "announcements": "bg-forest/10 text-forest",
  "climate-environment": "bg-sage/10 text-sage",
  "peacebuilding": "bg-earth/10 text-earth",
  "research": "bg-gold/10 text-earth",
  "partnerships": "bg-forest/10 text-forest",
  "media-coverage": "bg-muted/10 text-muted",
};

const categoryLabel: Record<string, string> = {
  "announcements": "Announcement",
  "climate-environment": "Climate & Environment",
  "peacebuilding": "Peacebuilding",
  "research": "Research",
  "partnerships": "Partnerships",
  "media-coverage": "Media Coverage",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Fallback stories shown when CMS is empty / during build
const fallbackStories = [
  {
    _id: "f1",
    title: "Waso Eco-Champs: Restoring 10,000 Trees in Northern Kenya's Fragile ASALs",
    slug: { current: "waso-eco-champs-restoration" },
    category: "climate-environment",
    excerpt:
      "Over 2,000 community eco-champions have mobilised across 10 wards of Isiolo County, planting indigenous trees to reverse decades of landscape degradation.",
    publishedAt: "2026-03-01",
    featuredImage: null,
  },
  {
    _id: "f2",
    title: "ASREP Featured in The Guardian: Conservation Without US Aid",
    slug: { current: "guardian-conservation-usaid" },
    category: "media-coverage",
    excerpt:
      "The Guardian highlights ASREP's approach to building locally-funded, community-led conservation in an era of declining international aid.",
    publishedAt: "2026-03-16",
    featuredImage: null,
  },
  {
    _id: "f3",
    title: "KSG 'Under the Tree' Civic Education Scales to 47 Counties",
    slug: { current: "ksg-under-the-tree-47-counties" },
    category: "partnerships",
    excerpt:
      "A landmark partnership with the Kenya School of Government takes participatory civic education from its Isiolo pilot to a national rollout programme.",
    publishedAt: "2025-11-15",
    featuredImage: null,
  },
];

export default async function FeaturedStories() {
  let stories: typeof fallbackStories = fallbackStories;

  try {
    const fetched = await readClient.fetch(NEWS_FEATURED_QUERY, {}, {
      next: { revalidate: 60 },
    });
    if (fetched && fetched.length > 0) {
      stories = fetched;
    }
  } catch {
    // CMS unavailable -- use fallback
  }

  return (
    <section className="section-pad bg-sand/30" aria-labelledby="stories-heading">
      <div className="container-asrep">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Latest Stories
            </p>
            <h2
              id="stories-heading"
              className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight"
            >
              News &amp; Impact from{" "}
              <span className="text-forest">the Field</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="shrink-0 inline-flex items-center gap-2 text-forest font-semibold text-sm
              hover:text-sage transition-colors group"
          >
            View All Stories
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {stories.map((story) => (
            <article
              key={story._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
                hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 bg-sand/50 overflow-hidden">
                {story.featuredImage ? (
                  <Image
                    src={urlFor(story.featuredImage).width(640).height(400).url()}
                    alt={(story.featuredImage as { alt?: string }).alt ?? story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-sage/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {/* Category pill */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColour[story.category] ?? "bg-white/80 text-charcoal"}`}>
                    {categoryLabel[story.category] ?? story.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <time
                  dateTime={story.publishedAt}
                  className="text-muted text-xs mb-3 font-medium"
                >
                  {formatDate(story.publishedAt)}
                </time>
                <h3 className="font-display font-bold text-charcoal text-lg leading-snug mb-3
                  group-hover:text-forest transition-colors line-clamp-3">
                  {story.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {story.excerpt}
                </p>
                <Link
                  href={`/news/${story.slug.current}`}
                  className="inline-flex items-center gap-1.5 text-forest font-semibold text-sm
                    hover:text-sage transition-colors group/link mt-auto"
                  aria-label={`Read the story: ${story.title}`}
                >
                  Read the Story
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

