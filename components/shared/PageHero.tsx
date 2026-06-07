import Image from "next/image";
import BreadcrumbNav from "./BreadcrumbNav";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  breadcrumbs?: Crumb[];
  /** Optional pill tag above the title */
  tag?: string;
  /** Dark overlay opacity, 0–100. Defaults to 60 */
  overlayOpacity?: number;
  /** Tailwind object-position class for the background image. Defaults to object-center */
  imagePosition?: string;
};

export default function PageHero({
  title,
  subtitle,
  imageSrc = "/images/hero/default-hero.jpg",
  imageAlt = "ASREP Africa field work in Kenya's ASAL landscape",
  breadcrumbs,
  tag,
  overlayOpacity = 60,
  imagePosition = "object-center",
}: Props) {
  return (
    <section
      className="relative min-h-[380px] md:min-h-[460px] flex items-end overflow-hidden bg-forest"
      aria-label={`${title} — page hero`}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className={`object-cover ${imagePosition}`}
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, rgba(26,58,42,${overlayOpacity / 100}) 0%, rgba(26,58,42,0.3) 60%, rgba(0,0,0,0.2) 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 container-asrep pb-12 md:pb-16 pt-28 md:pt-32 w-full">
        {breadcrumbs && <BreadcrumbNav crumbs={breadcrumbs} dark />}

        {tag && (
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest
            text-gold border border-gold/40 rounded-full mb-4 mt-2">
            {tag}
          </span>
        )}

        <h1 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl font-bold leading-tight
          max-w-3xl mb-3">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/75 text-base md:text-xl leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
