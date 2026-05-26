type Props = {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
};

/**
 * Single milestone in the vertical alternating timeline.
 * On desktop: alternates left/right sides of a centred spine.
 * On mobile: always left-aligned.
 */
export default function TimelineItem({
  year,
  title,
  description,
  isLeft = true,
  isFirst = false,
  isLast = false,
}: Props) {
  return (
    <div className={`relative flex ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-0 w-full`}>

      {/* ── Left column (desktop) ──────────────────────────────── */}
      <div className={`hidden md:flex flex-1 ${isLeft ? "justify-end pr-12" : "justify-start pl-12"}`}>
        {!isLeft && (
          <div className="bg-white border border-charcoal/10 rounded-2xl p-6 shadow-sm
            hover:shadow-lg transition-shadow max-w-sm w-full">
            <span className="inline-block text-xs font-bold uppercase tracking-widest
              text-gold bg-gold/10 px-2.5 py-1 rounded-full mb-3">
              {year}
            </span>
            <h3 className="font-display font-bold text-earth text-lg mb-2">{title}</h3>
            <p className="text-charcoal/65 text-sm leading-relaxed">{description}</p>
          </div>
        )}
      </div>

      {/* ── Spine + dot ───────────────────────────────────────── */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Line above */}
        {!isFirst && (
          <div className="w-px h-8 bg-sage/30 md:block hidden" aria-hidden="true" />
        )}
        {isFirst && <div className="h-8 md:block hidden" aria-hidden="true" />}

        {/* Dot */}
        <div className="w-4 h-4 rounded-full bg-forest ring-4 ring-forest/20 shrink-0 z-10" aria-hidden="true" />

        {/* Line below */}
        {!isLast && (
          <div className="w-px flex-1 bg-sage/30 min-h-[3rem]" aria-hidden="true" />
        )}
      </div>

      {/* ── Right column (desktop) / main column (mobile) ─────── */}
      <div className={`flex-1 pb-8 ${isLeft ? "md:pl-12" : "md:pr-12 md:invisible"} pl-6 md:pl-0`}>
        {/* Mobile — always visible */}
        <div className="md:hidden bg-white border border-charcoal/10 rounded-2xl p-6 shadow-sm">
          <span className="inline-block text-xs font-bold uppercase tracking-widest
            text-gold bg-gold/10 px-2.5 py-1 rounded-full mb-3">
            {year}
          </span>
          <h3 className="font-display font-bold text-earth text-lg mb-2">{title}</h3>
          <p className="text-charcoal/65 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Desktop — only visible on left side (isLeft=true) */}
        {isLeft && (
          <div className="hidden md:block bg-white border border-charcoal/10 rounded-2xl p-6 shadow-sm
            hover:shadow-lg transition-shadow max-w-sm w-full">
            <span className="inline-block text-xs font-bold uppercase tracking-widest
              text-gold bg-gold/10 px-2.5 py-1 rounded-full mb-3">
              {year}
            </span>
            <h3 className="font-display font-bold text-earth text-lg mb-2">{title}</h3>
            <p className="text-charcoal/65 text-sm leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
