import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { readClient } from "@/sanity/lib/client";
import { NEWS_POST_QUERY, NEWS_RELATED_QUERY, ALL_NEWS_SLUGS_QUERY } from "@/sanity/lib/queries";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import NewsCard from "@/components/shared/NewsCard";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const builder = createImageUrlBuilder(readClient);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const categoryLabel: Record<string, string> = {
  "announcements": "Announcement",
  "climate-environment": "Climate & Environment",
  "peacebuilding": "Peacebuilding",
  "research": "Research",
  "partnerships": "Partnerships",
  "media-coverage": "Media Coverage",
};

/* ─── Static fallback articles (shown when CMS is unavailable) ─────────── */
type FallbackPost = {
  title: string; category: string; publishedAt: string;
  author: string; authorRole: string; excerpt: string;
  featuredImage?: undefined; content?: undefined;
  heroImage: string; heroAlt: string;
};

const fallbackArticles: Record<string, FallbackPost> = {
  "waso-eco-champions-10000-trees": {
    title: "Waso Eco-Champions Plant 10,000 Indigenous Trees Across Isiolo County",
    category: "climate-environment",
    publishedAt: "2026-04-01",
    author: "ASREP Africa Communications",
    authorRole: "ASREP Africa",
    excerpt: "ASREP Africa's flagship Waso Eco-Champions programme has reached a landmark milestone: 10,000 indigenous trees planted across 10 wards of Isiolo County, mobilising over 2,000 community eco-champions in one of Kenya's most ambitious community-led restoration efforts.",
    heroImage: "/images/gallery/waso-eco-champs-line.jpg",
    heroAlt: "Waso Eco-Champions lined up at a community tree planting event in Isiolo County",
  },
  "guardian-conservation-usaid": {
    title: "ASREP Featured in The Guardian: Conservation Without US Aid",
    category: "media-coverage",
    publishedAt: "2026-03-16",
    author: "The Guardian",
    authorRole: "Global Environment Desk",
    excerpt: "The Guardian's global environment desk highlights ASREP Africa's community-led conservation model as a template for building locally-funded ecological restoration in an era of declining international aid and USAID funding reductions.",
    heroImage: "/images/gallery/asrep-forest-partnership.jpg",
    heroAlt: "ASREP Africa leaders in conservation partnership meeting",
  },
  "ksg-under-tree-national": {
    title: "KSG 'Under the Tree' Civic Education Series Goes National",
    category: "partnerships",
    publishedAt: "2026-02-20",
    author: "ASREP Africa Communications",
    authorRole: "ASREP Africa",
    excerpt: "A landmark partnership with the Kenya School of Government scales the Isiolo-piloted civic education model to all 47 Kenyan counties — a testament to ASREP's community-sourced civic education approach and its national policy resonance.",
    heroImage: "/images/gallery/dida-fayo-remarks-under-tree-series-launch-oldonyiro.jpg",
    heroAlt: "ASREP Africa Executive Director Dida Fayo giving keynote remarks at the KSG Under the Tree Series launch in Oldonyiro",
  },
  "biographic-future-conservation": {
    title: "Biographic Magazine: The Future of Conservation Without US Aid",
    category: "media-coverage",
    publishedAt: "2026-01-15",
    author: "Biographic Magazine",
    authorRole: "International Conservation Media",
    excerpt: "International conservation magazine Biographic profiles ASREP Africa's Waso Eco-Champions model as a blueprint for community-funded ecological restoration that operates independently of international donor dependency.",
    heroImage: "/images/gallery/kenya-forest-service-tree-planting.jpg",
    heroAlt: "ASREP Africa and Kenya Forest Service jointly planting trees",
  },
  "ik-vault-debut-cows-women-land": {
    title: "ASAL IK Vault Series Debut: 'Cows, Women & Land' Documents Borana Oromo Knowledge",
    category: "research",
    publishedAt: "2025-09-30",
    author: "ASREP Africa Research Team",
    authorRole: "ASREP Africa",
    excerpt: "ASREP releases its debut ASAL Indigenous Knowledge Vault publication — 'Cows, Women & Land' — documenting Borana Oromo ecological and cultural knowledge from Isiolo County. The publication entered policy discourse at county and national level and set a new benchmark for IK documentation in Kenya's ASALs.",
    heroImage: "/images/gallery/asrep-elders-strategic-meeting.jpg",
    heroAlt: "ASREP Africa executive and community elders at an indigenous knowledge documentation meeting",
  },
  "isiolo-peace-forum-500": {
    title: "Isiolo Peace Actors Forum Engages 500+ Community Members",
    category: "peacebuilding",
    publishedAt: "2025-08-10",
    author: "ASREP Africa Communications",
    authorRole: "ASREP Africa",
    excerpt: "The Isiolo Peace Actors Forum convened its largest session to date, bringing together 500+ pastoral communities, women leaders, and youth from across 10 wards of Isiolo County to address resource-driven conflict and build durable inter-community trust.",
    heroImage: "/images/gallery/community-women-peace-prayer.jpg",
    heroAlt: "Women community leaders in a peace prayer circle at the Isiolo Peace Actors Forum",
  },
};

/* Related articles for sidebar — shown when CMS has no related posts */
const fallbackRelated = Object.entries(fallbackArticles)
  .map(([slug, post]) => ({
    _id: slug,
    title: post.title,
    slug: { current: slug },
    category: post.category,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    featuredImage: undefined as undefined,
  }));

export async function generateStaticParams() {
  // Include both CMS slugs and static fallback slugs
  const staticSlugs = Object.keys(fallbackArticles).map((slug) => ({ slug }));
  try {
    const cmsSlugs = await readClient.fetch(ALL_NEWS_SLUGS_QUERY);
    const combined = [...staticSlugs, ...cmsSlugs.map((s: { slug: string }) => ({ slug: s.slug }))];
    // Deduplicate
    return combined.filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i);
  } catch {
    return staticSlugs;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await readClient.fetch(NEWS_POST_QUERY, { slug });
    if (post) {
      return {
        title: `${post.title} | ASREP Africa`,
        description: post.metaDescription ?? post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          images: post.featuredImage
            ? [{ url: urlFor(post.featuredImage).width(1200).height(630).url() }]
            : [],
        },
      };
    }
  } catch { /* fall through to static */ }

  const fallback = fallbackArticles[slug];
  if (fallback) {
    return {
      title: `${fallback.title} | ASREP Africa`,
      description: fallback.excerpt,
      openGraph: {
        title: fallback.title,
        description: fallback.excerpt,
        images: [{ url: fallback.heroImage, width: 1200, height: 630, alt: fallback.heroAlt }],
      },
    };
  }
  return { title: "Article Not Found | ASREP Africa" };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: {
    title: string; category: string; publishedAt: string; author?: string; authorRole?: string;
    excerpt: string; featuredImage?: SanityImageSource & { alt?: string };
    content?: unknown[];
    heroImage?: string; heroAlt?: string;
  } | null = null;

  let relatedPosts: {
    _id: string; title: string; slug: { current: string }; category: string;
    excerpt: string; publishedAt: string; featuredImage?: SanityImageSource & { alt?: string };
  }[] = [];

  // Try CMS first
  try {
    const cmsPost = await readClient.fetch(NEWS_POST_QUERY, { slug }, { next: { revalidate: 60 } });
    if (cmsPost) {
      post = cmsPost;
      relatedPosts = await readClient.fetch(NEWS_RELATED_QUERY, {
        category: post!.category, slug,
      }, { next: { revalidate: 60 } });
    }
  } catch { /* CMS unavailable */ }

  // Fall back to static article data
  if (!post) {
    const fallback = fallbackArticles[slug];
    if (!fallback) notFound();
    post = fallback;
    relatedPosts = fallbackRelated
      .filter((r) => r.category === fallback.category && r._id !== slug)
      .slice(0, 3);
  }

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const shareUrl = `https://www.asrepafrica.org/news/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  // Determine hero image
  const heroSrc = post.featuredImage
    ? urlFor(post.featuredImage).width(1920).height(900).url()
    : (post as { heroImage?: string }).heroImage ?? "/images/about/about-hero.jpg";
  const heroAlt = (post.featuredImage as { alt?: string } | undefined)?.alt
    ?? (post as { heroAlt?: string }).heroAlt ?? post.title;

  return (
    <article>
      {/* ── Hero image ──────────────────────────────────────────────────── */}
      <div className="relative min-h-[400px] md:min-h-[520px] bg-forest overflow-hidden">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />
        <div className="absolute inset-0 flex items-end z-10">
          <div className="container-asrep pb-12 pt-32 max-w-3xl">
            <BreadcrumbNav
              crumbs={[{ label: "News & Media", href: "/news" }, { label: "Article" }]}
              dark
            />
            <span className="inline-block mt-3 mb-4 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold">
              {categoryLabel[post.category] ?? post.category}
            </span>
            <h1 className="font-display text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              {post.author && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.author}{post.authorRole ? `, ${post.authorRole}` : ""}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="bg-cream">
        <div className="container-asrep py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Article content */}
            <div className="lg:col-span-2">
              {/* Lead paragraph */}
              <p className="text-charcoal text-lg leading-relaxed font-medium mb-8 border-l-4 border-gold pl-5">
                {post.excerpt}
              </p>

              {/* Portable text body from CMS */}
              {post.content && (
                <div className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-earth
                  prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-charcoal/75 prose-p:leading-relaxed
                  prose-a:text-forest prose-a:underline hover:prose-a:text-sage
                  prose-blockquote:border-gold prose-blockquote:text-earth prose-blockquote:font-display prose-blockquote:italic
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-strong:text-charcoal">
                  <PortableText value={post.content as Parameters<typeof PortableText>[0]["value"]} />
                </div>
              )}

              {/* CTA to full story / external source when no body content */}
              {!post.content && (
                <div className="bg-white rounded-2xl p-8 border border-charcoal/8 shadow-sm">
                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    For the full story and latest updates from ASREP Africa, visit our social media channels
                    or subscribe to our newsletter.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="px-5 py-2.5 bg-forest text-white font-semibold text-sm rounded-lg hover:bg-sage transition-colors"
                    >
                      Subscribe to Updates
                    </Link>
                    <a
                      href="https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-forest text-forest font-semibold text-sm rounded-lg hover:bg-forest/5 transition-colors"
                    >
                      Follow on LinkedIn
                    </a>
                  </div>
                </div>
              )}

              {/* Social share */}
              <div className="mt-12 pt-8 border-t border-charcoal/10">
                <p className="text-charcoal/50 text-xs uppercase tracking-widest font-semibold mb-4">Share this story</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, colour: "hover:bg-[#0077b5]" },
                    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, colour: "hover:bg-[#1877f2]" },
                    { name: "X / Twitter", href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, colour: "hover:bg-black" },
                    { name: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, colour: "hover:bg-[#25d366]" },
                  ].map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg bg-white border border-charcoal/15 text-charcoal/60
                        hover:text-white text-sm font-medium transition-all ${s.colour}`}
                      aria-label={`Share on ${s.name}`}>
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/8 sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">More Stories</p>
                <div className="space-y-5">
                  {relatedPosts.slice(0, 3).map((rel) => (
                    <Link key={rel._id} href={`/news/${rel.slug.current}`}
                      className="block group">
                      <p className="text-xs text-muted mb-1">
                        {new Date(rel.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-sm font-medium text-charcoal group-hover:text-forest transition-colors leading-snug line-clamp-3">
                        {rel.title}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link href="/news" className="flex items-center gap-1.5 mt-6 text-forest text-sm font-semibold hover:text-sage transition-colors">
                  View all stories →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="section-pad bg-white" aria-label="Related stories">
          <div className="container-asrep">
            <h2 className="font-display font-bold text-earth text-2xl mb-8">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedPosts.slice(0, 3).map((rel) => (
                <NewsCard
                  key={rel._id}
                  slug={rel.slug.current}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  category={rel.category}
                  publishedAt={rel.publishedAt}
                  imageUrl={rel.featuredImage
                    ? urlFor(rel.featuredImage).width(640).height(400).url()
                    : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
