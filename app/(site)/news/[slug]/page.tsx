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

export async function generateStaticParams() {
  try {
    const slugs = await readClient.fetch(ALL_NEWS_SLUGS_QUERY);
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await readClient.fetch(NEWS_POST_QUERY, { slug: params.slug });
    if (!post) return { title: "Article Not Found | ASREP Africa" };
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
  } catch {
    return { title: "ASREP Africa News" };
  }
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  let post: {
    title: string; category: string; publishedAt: string; author?: string; authorRole?: string;
    excerpt: string; featuredImage?: SanityImageSource & { alt?: string };
    content?: unknown[];
  } | null = null;
  let relatedPosts: {
    _id: string; title: string; slug: { current: string }; category: string;
    excerpt: string; publishedAt: string; featuredImage?: SanityImageSource & { alt?: string };
  }[] = [];

  try {
    post = await readClient.fetch(NEWS_POST_QUERY, { slug: params.slug }, { next: { revalidate: 60 } });
    if (!post) notFound();
    relatedPosts = await readClient.fetch(NEWS_RELATED_QUERY, {
      category: post.category, slug: params.slug
    }, { next: { revalidate: 60 } });
  } catch {
    notFound();
  }

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const shareUrl = `https://www.asrepafrica.org/news/${params.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <article>
      {/* ── Hero image ──────────────────────────────────────────────────── */}
      <div className="relative min-h-[400px] md:min-h-[520px] bg-forest overflow-hidden">
        {post.featuredImage && (
          <Image
            src={urlFor(post.featuredImage).width(1920).height(900).url()}
            alt={post.featuredImage.alt ?? post.title}
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
          />
        )}
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

              {/* Portable text body */}
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
