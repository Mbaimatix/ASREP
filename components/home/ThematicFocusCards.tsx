import Link from "next/link";

const programmes = [
  {
    href: "/what-we-do/climate-resilience",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colour: "bg-forest/10 text-forest border-forest/20",
    accent: "text-forest",
    title: "Climate Resilience & NbS",
    description:
      "Restoring degraded landscapes and building climate-adaptive capacity through nature-based solutions, including the Waso Eco-Champs programme.",
    stat: "10,000 trees planted · 2,000 eco-champions",
  },
  {
    href: "/what-we-do/peacebuilding",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    colour: "bg-earth/10 text-earth border-earth/20",
    accent: "text-earth",
    title: "Peacebuilding & Social Cohesion",
    description:
      "Fostering dialogue across pastoral and farming communities to resolve resource conflicts and strengthen inter-community bonds in Northern Kenya.",
    stat: "500+ peace actors engaged · Isiolo Peace Forum",
  },
  {
    href: "/what-we-do/research-knowledge",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    colour: "bg-gold/10 text-earth border-gold/20",
    accent: "text-gold",
    title: "Research & Knowledge",
    description:
      "Documenting indigenous knowledge and generating evidence to inform policy — including the landmark ASAL Indigenous Knowledge Vault Series.",
    stat: "Debut release: Cows, Women & Land · Borana Oromo IK",
  },
  {
    href: "/what-we-do/civic-governance",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    colour: "bg-sage/10 text-forest border-sage/20",
    accent: "text-sage",
    title: "Civic Governance & Youth",
    description:
      "Deepening citizen engagement and youth leadership through the KSG 'Under the Tree' Series — now scaling from Isiolo across all 47 counties.",
    stat: "KSG pilot → 47-county national rollout",
  },
  {
    href: "/what-we-do/biodiversity",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    colour: "bg-forest/10 text-forest border-forest/20",
    accent: "text-forest",
    title: "Biodiversity Restoration",
    description:
      "Protecting iconic ASAL wildlife and ecosystems through community-led conservation, in partnership with San Diego Zoo Wildlife Alliance.",
    stat: "Isiolo County represented · SDZWA-K strategy validation",
  },
  {
    href: "/what-we-do/livelihoods",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    colour: "bg-earth/10 text-earth border-earth/20",
    accent: "text-earth",
    title: "Livelihoods & Economic Empowerment",
    description:
      "Creating sustainable income pathways for ASAL communities through eco-entrepreneurship, green skills, and market linkages.",
    stat: "40+ participants · Eco-entrepreneurship Webinar 2025",
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
              className={`group relative flex flex-col p-7 rounded-2xl border bg-white
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none
                ${prog.colour}`}
            >
              {/* Icon */}
              <div className={`mb-5 ${prog.accent}`}>
                {prog.icon}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-charcoal text-lg leading-snug mb-3 group-hover:text-forest transition-colors">
                {prog.title}
              </h3>

              {/* Description */}
              <p className="text-charcoal/65 text-sm leading-relaxed mb-4 flex-1">
                {prog.description}
              </p>

              {/* Stat */}
              <p className={`text-xs font-medium ${prog.accent} mb-4`}>
                {prog.stat}
              </p>

              {/* Arrow */}
              <div className={`flex items-center gap-1 text-xs font-semibold ${prog.accent} group-hover:gap-2 transition-all`}>
                Learn More
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
