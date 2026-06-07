import Link from "next/link";
import Image from "next/image";

const publications = [
  {
    id: "p1",
    type: "IK Vault Series",
    title: "Cows, Women & Land",
    subtitle: "ASAL Indigenous Knowledge Vault — Debut Release",
    year: "2025",
    coverImage: "/images/resources/resources-hero.jpg",
    description: "Documenting Borana Oromo ecological and cultural knowledge from Isiolo County — the debut of ASREP's ASAL Indigenous Knowledge Vault Series.",
    href: "/resources",
    colour: "from-earth/80",
  },
  {
    id: "p2",
    type: "Impact Report",
    title: "ASREP Impact Report 2025-2026",
    subtitle: "Annual Impact & Financial Report",
    year: "2026",
    coverImage: "/images/impact/impact-hero.jpg",
    description: "Comprehensive coverage of all six programmes, financial highlights, partner acknowledgements, and our vision for 2026-2027.",
    href: "/impact",
    colour: "from-forest/80",
  },
  {
    id: "p3",
    type: "Flagship Feature Paper",
    title: "State of the Ewaso Nyiro River 2026",
    subtitle: "Flagship Feature Paper · World Environment Day 2026",
    year: "2026",
    coverImage: "/images/resources/resources-hero.jpg",
    description: "On this #WorldEnvironmentDay2026, ASREP releases its Flagship Feature Paper: STATE OF THE EWASO NYIRO RIVER 2026 — a concise, evidence-based assessment of the environmental pressures, climate risks, and resilience imperatives facing over 3.6 million people across Laikipia, Isiolo, Samburu, Marsabit, Wajir & Southern Somalia.",
    href: "/resources",
    colour: "from-sage/80",
  },
];

export default function PublicationsSection() {
  return (
    <section className="section-pad bg-white" aria-labelledby="publications-heading">
      <div className="container-asrep">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Knowledge Hub
            </p>
            <h2
              id="publications-heading"
              className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight"
            >
              Reports &amp;{" "}
              <span className="text-forest">Publications</span>
            </h2>
          </div>
          <Link
            href="/resources"
            className="shrink-0 inline-flex items-center gap-2 text-forest font-semibold text-sm
              hover:text-sage transition-colors group"
          >
            View All Publications
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {publications.map((pub) => (
            <Link
              key={pub.id}
              href={pub.href}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl
                transition-all duration-300 hover:-translate-y-1 flex flex-col"
              aria-label={`Read: ${pub.title}`}
            >
              {/* Cover image */}
              <div className="relative h-52 bg-forest overflow-hidden">
                <Image
                  src={pub.coverImage}
                  alt={pub.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${pub.colour} to-transparent`} />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {pub.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-display font-bold text-lg leading-snug">
                    {pub.title}
                  </p>
                  <p className="text-white/70 text-xs mt-1">{pub.subtitle} &middot; {pub.year}</p>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 bg-cream p-5 border border-charcoal/8 rounded-b-2xl">
                <p className="text-charcoal/65 text-sm leading-relaxed line-clamp-3">
                  {pub.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-forest font-semibold text-xs group-hover:text-sage transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download / View
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
