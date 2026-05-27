import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events & Summits | ASREP Africa",
  description:
    "Upcoming and past events from ASREP Africa — summits, forums, workshops, and community dialogues across Kenya's ASALs.",
  openGraph: {
    title: "Events & Summits | ASREP Africa",
    description: "Upcoming summits, forums, and community events from ASREP Africa.",
    images: [{ url: "/images/about/about-hero.jpg", width: 1200, height: 630, alt: "ASREP Africa events" }],
  },
};

const upcomingEvents = [
  {
    id: "e1",
    title: "Isiolo Peace Actors Forum — Annual Dialogue 2026",
    date: "August 2026",
    location: "Isiolo County, Kenya",
    type: "Peace Forum",
    description:
      "The annual Isiolo Peace Actors Forum convenes pastoral communities, women leaders, and youth from across 10 wards to strengthen inter-community trust and address resource conflicts.",
    status: "upcoming",
  },
  {
    id: "e2",
    title: "ASAL Research Symposium: Indigenous Knowledge in Policy",
    date: "September 2026",
    location: "Nairobi, Kenya",
    type: "Research Symposium",
    description:
      "ASREP co-hosts a national symposium on integrating ASAL indigenous knowledge into climate and governance policy — featuring the ASAL IK Vault Series findings.",
    status: "upcoming",
  },
  {
    id: "e3",
    title: "Eco-Entrepreneurship Summit 2026",
    date: "October 2026",
    location: "Isiolo County, Kenya",
    type: "Economic Empowerment",
    description:
      "Building on the success of the 2025 eco-entrepreneurship webinar, this in-person summit brings together community entrepreneurs, market partners, and green finance experts.",
    status: "upcoming",
  },
];

const pastEvents = [
  {
    id: "pe1",
    title: "Isiolo Peace Actors Forum — 2025 Dialogue",
    date: "August 2025",
    location: "Isiolo County, Kenya",
    type: "Peace Forum",
    description: "Convened 500+ peace actors from 10 wards of Isiolo County — the largest peace dialogue session in ASREP's history.",
    status: "past",
  },
  {
    id: "pe2",
    title: "ASAL IK Vault Launch — 'Cows, Women & Land'",
    date: "September 2025",
    location: "Isiolo County, Kenya",
    type: "Research Launch",
    description: "The landmark launch of ASREP's debut ASAL Indigenous Knowledge Vault publication, attended by community elders, researchers, and county government officials.",
    status: "past",
  },
  {
    id: "pe3",
    title: "KSG Under the Tree — National Launch",
    date: "February 2026",
    location: "Kenya School of Government, Nairobi",
    type: "Partnership Launch",
    description: "Ceremonial launch of the national scaling of ASREP's community civic education model across all 47 Kenyan counties in partnership with KSG.",
    status: "past",
  },
  {
    id: "pe4",
    title: "Eco-Entrepreneurship Webinar",
    date: "March 2025",
    location: "Online / Isiolo",
    type: "Economic Empowerment",
    description: "ASREP's inaugural eco-entrepreneurship webinar attracted 40+ participants from ASAL communities, green enterprise experts, and development finance specialists.",
    status: "past",
  },
];

const typeColour: Record<string, string> = {
  "Peace Forum": "bg-earth/10 text-earth",
  "Research Symposium": "bg-gold/10 text-earth",
  "Research Launch": "bg-gold/10 text-earth",
  "Economic Empowerment": "bg-forest/10 text-forest",
  "Partnership Launch": "bg-sage/10 text-sage",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Events & Summits"
        subtitle="Bringing communities, researchers, and policymakers together to advance resilience across Kenya's ASALs."
        imageSrc="/images/about/about-hero.jpg"
        imageAlt="ASREP Africa community summit and dialogue event"
        breadcrumbs={[{ label: "Events & Summits" }]}
        tag="Convening Change"
      />

      {/* Upcoming events */}
      <section className="section-pad bg-cream" aria-labelledby="upcoming-heading">
        <div className="container-asrep">
          <div className="mb-10">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-2">Coming Up</p>
            <h2 id="upcoming-heading" className="font-display text-earth text-3xl font-bold">
              Upcoming Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-charcoal/8">
                <div className="bg-forest p-5 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gold text-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {event.type}
                    </span>
                    <span className="text-white/60 text-xs">{event.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-snug">{event.title}</h3>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-muted text-xs mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <p className="text-charcoal/65 text-sm leading-relaxed mb-5">{event.description}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white
                      font-semibold text-sm rounded-lg hover:bg-sage transition-colors"
                  >
                    Express Interest
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past events */}
      <section className="section-pad bg-white" aria-labelledby="past-heading">
        <div className="container-asrep">
          <div className="mb-10">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-2">Archive</p>
            <h2 id="past-heading" className="font-display text-earth text-3xl font-bold">
              Past Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex gap-5 p-6 bg-cream rounded-2xl border border-charcoal/8">
                <div className="shrink-0 w-1.5 rounded-full bg-charcoal/15 self-stretch" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${typeColour[event.type] ?? "bg-charcoal/10 text-charcoal"}`}>
                      {event.type}
                    </span>
                    <span className="text-muted text-xs">{event.date} &middot; {event.location}</span>
                  </div>
                  <h3 className="font-display font-bold text-charcoal text-base mb-2">{event.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-pad bg-forest">
        <div className="container-asrep max-w-2xl text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Stay Informed</p>
          <h2 className="font-display text-white text-2xl md:text-3xl font-bold mb-4">
            Never Miss an Event
          </h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            Subscribe to ASREP&apos;s newsletter for event announcements, research launches, and field updates from Kenya&apos;s ASALs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest
              font-semibold rounded-xl hover:bg-cream transition-colors"
          >
            Subscribe to Updates
          </Link>
        </div>
      </section>
    </>
  );
}
