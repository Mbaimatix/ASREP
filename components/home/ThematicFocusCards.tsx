import Link from "next/link";
import Image from "next/image";

const programmes = [
  {
    href: "/what-we-do/climate-resilience",
    image: "/images/programmes/climate-resilience-hero.jpg",
    imageAlt: "Waso Eco-Champions planting indigenous trees in Isiolo County",
    colour: "border-forest/25",
    accentBg: "bg-forest",
    title: "Climate Resilience & NbS",
    description:
      "Restoring degraded landscapes through nature-based solutions. The Waso Eco-Champs programme has planted 10,000 indigenous trees across 10 wards of Isiolo County.",
    stat: "10,000 trees planted &middot; 2,000 eco-champions",
  },
  {
    href: "/what-we-do/peacebuilding",
    image: "/images/programmes/peacebuilding-hero.jpg",
    imageAlt: "Inter-community peace dialogue convened by ASREP in Northern Kenya",
    colour: "border-earth/25",
    accentBg: "bg-earth",
    title: "Peacebuilding & Social Cohesion",
    description:
      "Fostering dialogue across pastoral and farming communities to resolve resource conflicts and strengthen inter-community bonds through the Isiolo Peace Actors Forum.",
    stat: "500+ peace actors engaged &middot; 60% women & youth",
  },
  {
    href: "/what-we-do/research-knowledge",
    image: "/images/programmes/research-hero.jpg",
    imageAlt: "ASREP researcher with community elders during indigenous knowledge documentation",
    colour: "border-gold/30",
    accentBg: "bg-earth",
    title: "Research & Knowledge",
    description:
      "Documenting indigenous knowledge and generating evidence to inform policy. The ASAL IK Vault Series debut — 'Cows, Women & Land' — entered policy discourse nationally.",
    stat: "ASAL IK Vault Series &middot; Borana Oromo Knowledge",
  },
  {
    href: "/what-we-do/civic-governance",
    image: "/images/programmes/civic-governance-hero.jpg",
    imageAlt: "KSG Under the Tree civic education session with community members",
    colour: "border-sage/30",
    accentBg: "bg-sage",
    title: "Civic Governance & Youth",
    description:
      "Deepening citizen engagement through the KSG 'Under the Tree' Series — piloted in Isiolo and now scaling across all 47 Kenyan counties via a landmark KSG partnership.",
    stat: "KSG pilot &rarr; 47-county national rollout",
  },
  {
    href: "/what-we-do/biodiversity",
    image: "/images/programmes/biodiversity-hero.jpg",
    imageAlt: "Biodiversity restoration and wildlife conservation in ASAL Kenya",
    colour: "border-forest/25",
    accentBg: "bg-forest",
    title: "Biodiversity Restoration",
    description:
      "Protecting iconic ASAL wildlife and ecosystems through community-led conservation. ASREP represented Isiolo County in national biodiversity strategy development with SDZWA-K.",
    stat: "SDZWA-K partner &middot; Isiolo County strategy",
  },
  {
    href: "/what-we-do/livelihoods",
    image: "/images/programmes/livelihoods-hero.jpg",
    imageAlt: "Community eco-entrepreneurship training and livelihoods programme",
    colour: "border-earth/25",
    accentBg: "bg-earth",
    title: "Livelihoods & Economic Empowerment",
    description:
      "Creating sustainable income pathways through eco-entrepreneurship, green skills, and market linkages. Over 40 participants in the inaugural eco-entrepreneurship webinar.",
    stat: "40+ participants &middot; Eco-entrepreneurship 2025",
  },
];

export default function ThematicFocusCards() {
  return (
    <section className="section-pad bg-white" aria-labelledby="programmes-heading">
      <div className="container-asrep">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            What We Do
          </p>
          <h2
            id="programmes-heading"
            className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            Six Pathways to a{" "}
            <span className="text-forest">Resilient ASAL</span>
          </h2>
          <p className="text-charcoal/65 text-base md:text-lg leading-relaxed">
            Our integrated programmes address the interconnected challenges of climate
            vulnerability, conflict, weak governance, and economic marginalisation.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((prog) => (
            <Link
              key={prog.href}
              href={prog.href}
              className={`group relative flex flex-col rounded-2xl border-2 bg-white overflow-hidden
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none
                ${prog.colour}`}
            >
              {/* Photo header */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-forest to-sage">
                <Image
                  src={prog.image}
                  alt={prog.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 text-center">
                {/* Title */}
                <h3 className="font-display font-bold text-charcoal text-lg leading-snug mb-3 group-hover:text-forest transition-colors">
                  {prog.title}
                </h3>

                {/* Description */}
                <p className="text-charcoal/65 text-sm leading-relaxed mb-4 flex-1">
                  {prog.description}
                </p>

                {/* Stat */}
                <p
                  className="text-xs font-medium text-muted mb-5"
                  dangerouslySetInnerHTML={{ __html: prog.stat }}
                />

                {/* Solid CTA button */}
                <div className={`inline-flex items-center justify-center gap-2 px-5 py-2.5
                  ${prog.accentBg} text-white text-sm font-semibold rounded-lg
                  group-hover:opacity-90 transition-opacity mx-auto`}>
                  More Details
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom link */}
        <div className="text-center mt-12">
          <Link
            href="/what-we-do"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest text-forest
              font-semibold text-sm rounded-xl hover:bg-forest hover:text-white transition-all duration-200
              focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
          >
            View All Programmes
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
