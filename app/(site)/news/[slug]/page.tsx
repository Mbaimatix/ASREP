import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import NewsCard from "@/components/shared/NewsCard";
import { getArticle, getArticleList, getArticleSlugs } from "@/lib/get-news";

const categoryLabel: Record<string, string> = {
  "announcements": "Announcement",
  "climate-environment": "Climate & Environment",
  "peacebuilding": "Peacebuilding",
  "research": "Research",
  "partnerships": "Partnerships",
  "media-coverage": "Media Coverage",
};

/* ─── Reading time helper ───────────────────────────────────────────────── */
function readingTime(text: string): number {
  return Math.ceil(text.split(" ").length / 200);
}

/* ─── Inline link parser helper ─────────────────────────────────────────── */
function parseInlineLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`link-${keyCounter++}`}
        href={match[2]}
        className="text-forest hover:text-sage underline underline-offset-2 font-medium"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/* ─── Article body renderer (markdown-lite) ─────────────────────────────── */
function renderArticleBody(body: string): React.ReactNode {
  const blocks = body.split(/\n\n+/);
  const rendered: React.ReactNode[] = [];
  let listItems: string[] = [];
  let paragraphCount = 0;

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      rendered.push(
        <ul key={`ul-${key}`} className="list-disc list-outside pl-6 space-y-2 my-4 text-charcoal/75">
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{parseInlineLinks(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  blocks.forEach((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    const lines = trimmed.split("\n");

    // Check if entire block is bullet list items
    const allBullets = lines.every((l) => l.startsWith("• "));

    if (allBullets) {
      flushList(`before-${idx}`);
      const items = lines.map((l) => l.slice(2).trim());
      rendered.push(
        <ul key={`ul-${idx}`} className="list-disc list-outside pl-6 space-y-2 my-4 text-charcoal/75">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">{parseInlineLinks(item)}</li>
          ))}
        </ul>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList(`before-${idx}`);
      const headingText = trimmed.slice(3);
      rendered.push(
        <h2 key={`h2-${idx}`} className="font-display font-bold text-earth text-2xl mt-10 mb-4 leading-snug">
          {headingText}
        </h2>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList(`before-${idx}`);
      const quoteText = trimmed.slice(2);
      rendered.push(
        <blockquote key={`bq-${idx}`} className="my-8 pl-6 border-l-4 border-forest italic text-earth font-display text-lg leading-relaxed">
          {parseInlineLinks(quoteText)}
        </blockquote>
      );
    } else {
      flushList(`before-${idx}`);
      paragraphCount++;
      rendered.push(
        <p key={`p-${idx}`} className="text-charcoal/75 leading-relaxed mb-5">
          {parseInlineLinks(trimmed)}
        </p>
      );
      // Insert newsletter CTA after 3rd paragraph
      if (paragraphCount === 3) {
        rendered.push(
          <div key="newsletter-cta" className="my-8 p-6 bg-forest/5 border border-forest/15 rounded-2xl">
            <p className="font-display font-bold text-forest text-lg mb-1">Get field updates from Kenya&apos;s ASALs</p>
            <p className="text-charcoal/60 text-sm mb-4">Join our community of supporters receiving ASREP&apos;s latest news and impact stories.</p>
            <Link href="/#newsletter" className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-sm font-semibold rounded-lg hover:bg-sage transition-colors">
              Subscribe to updates →
            </Link>
          </div>
        );
      }
    }
  });

  flushList("final");
  return <>{rendered}</>;
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticle(slug);
  if (post) {
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.heroAlt }],
      },
    };
  }
  return { title: "Article Not Found" };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = getArticle(slug);
  if (!post) notFound();

  const allPosts = getArticleList();
  const relatedPosts = allPosts
    .filter((r) => r.category === post.category && r.slug !== slug)
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const shareUrl = `https://asrepafrica.org/news/${slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const heroSrc = post.heroImage;
  const heroAlt = post.heroAlt;

  // JSON-LD structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "author": { "@type": "Person", "name": post.author },
    "publisher": {
      "@type": "Organization",
      "name": "ASREP Africa",
      "logo": { "@type": "ImageObject", "url": "https://asrepafrica.org/logos/asrep-logo.png" }
    },
    "image": `https://asrepafrica.org${heroSrc.startsWith("/") ? heroSrc : "/" + heroSrc}`,
    "description": post.excerpt,
  };

  return (
    <article>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

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
              <span aria-hidden="true">·</span>
              <span>{post.author}{post.authorRole ? `, ${post.authorRole}` : ""}</span>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.body)} min read</span>
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

              {/* Article body */}
              <div className="space-y-0">
                {renderArticleBody(post.body)}
              </div>

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
                    <Link key={rel.slug} href={`/news/${rel.slug}`}
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
                  key={rel.slug}
                  slug={rel.slug}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  category={rel.category}
                  publishedAt={rel.publishedAt}
                  imageUrl={rel.heroImage}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
