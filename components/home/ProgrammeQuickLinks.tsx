"use client";
import Link from "next/link";

const programmes = [
  {
    label: "Climate Resilience",
    icon: "🌱",
    href: "/what-we-do/climate-resilience",
    aria: "Explore Climate Resilience programme",
  },
  {
    label: "Peacebuilding",
    icon: "🕊️",
    href: "/what-we-do/peacebuilding",
    aria: "Explore Peacebuilding programme",
  },
  {
    label: "Research & Knowledge",
    icon: "📖",
    href: "/what-we-do/research-knowledge",
    aria: "Explore Research and Knowledge programme",
  },
  {
    label: "Civic Governance",
    icon: "🏛️",
    href: "/what-we-do/civic-governance",
    aria: "Explore Civic Governance and Youth programme",
  },
  {
    label: "Biodiversity",
    icon: "🐘",
    href: "/what-we-do/biodiversity",
    aria: "Explore Biodiversity Restoration programme",
  },
  {
    label: "Livelihoods",
    icon: "🤝",
    href: "/what-we-do/livelihoods",
    aria: "Explore Livelihoods and Economic Empowerment programme",
  },
];

export default function ProgrammeQuickLinks() {
  return (
    <section
      className="w-full bg-forest border-t border-sage/20"
      aria-label="Programme quick navigation"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center">

        {/* Location badge */}
        <div className="flex items-center justify-center md:justify-start
                        gap-2 py-3 md:py-4 md:pr-6 border-b md:border-b-0
                        md:border-r border-sage/30 md:shrink-0">
          <svg
            className="w-4 h-4 text-gold shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="text-sand text-xs font-semibold uppercase tracking-wide leading-none">
              ASREP Africa
            </p>
            <p className="text-sand/70 text-xs leading-tight mt-0.5">
              Isiolo County, Kenya
            </p>
          </div>
        </div>

        {/* Programme pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 py-3 md:pl-4 flex-1">
          {programmes.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-label={p.aria}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                         text-sand/80 hover:text-sand hover:bg-sage/40 transition-all duration-200
                         whitespace-nowrap group"
            >
              <span aria-hidden="true" className="text-sm">{p.icon}</span>
              {p.label}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold text-xs ml-0.5">
                →
              </span>
            </Link>
          ))}

          {/* Divider + View All */}
          <span className="mx-1 h-4 border-l border-sage/30 hidden sm:block" aria-hidden="true" />
          <Link
            href="/what-we-do"
            aria-label="View all ASREP programmes"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gold
                       hover:text-gold/80 uppercase tracking-wide transition-colors whitespace-nowrap"
          >
            View All →
          </Link>
        </div>

      </div>
    </section>
  );
}
