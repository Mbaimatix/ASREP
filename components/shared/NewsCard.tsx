import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  imageAlt?: string;
};

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

export default function NewsCard({
  slug,
  title,
  excerpt,
  category,
  publishedAt,
  imageUrl,
  imageAlt,
}: Props) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
      hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 bg-sand/40 overflow-hidden shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-sand/50">
            <svg className="w-10 h-10 text-sage/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold
            ${categoryColour[category] ?? "bg-white/80 text-charcoal"}`}>
            {categoryLabel[category] ?? category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <time dateTime={publishedAt} className="text-muted text-xs mb-3 font-medium">
          {formatDate(publishedAt)}
        </time>
        <h3 className="font-display font-bold text-charcoal text-lg leading-snug mb-3
          group-hover:text-forest transition-colors line-clamp-3 flex-1">
          {title}
        </h3>
        <p className="text-charcoal/60 text-sm leading-relaxed mb-5 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/news/${slug}`}
          className="inline-flex items-center gap-1.5 text-forest font-semibold text-sm
            hover:text-sage transition-colors group/link mt-auto"
          aria-label={`Read more: ${title}`}
        >
          Read More
          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
