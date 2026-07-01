import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import LightboxGallery from "@/components/shared/LightboxGallery";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos from ASREP Africa's programmes — eco-champions, peace dialogues, indigenous knowledge research, and civic governance across Isiolo County.",
  openGraph: {
    title: "Photo Gallery | ASREP Africa",
    description: "Field photography from ASREP Africa's programmes across Isiolo County, Kenya.",
    images: [{ url: "/images/gallery/waso-eco-champs-line.jpg", width: 1200, height: 630, alt: "ASREP Africa field photography" }],
  },
};

// Field & programme photos
const fieldPhotos = [
  {
    src: "/images/gallery/asrep-agar-mou-signing-impact-report-group.jpg",
    alt: "Representatives from ASREP Africa and African Agency for Arid Resources Limited (AGAR) holding the ASREP Impact Report after signing a strategic MOU Framework Agreement",
    caption: "ASREP Africa & AGAR MOU signing — Isiolo, June 2026",
  },
  {
    src: "/images/gallery/asrep-agar-mou-seated-discussion.jpg",
    alt: "AGAR representative and ASREP Africa team member in discussion at the MOU signing table",
    caption: "ASREP Africa & AGAR MOU seated discussion — Isiolo, June 2026",
  },
  {
    src: "/images/gallery/asrep-agar-mou-team-roundtable.jpg",
    alt: "Four representatives from ASREP Africa and AGAR in roundtable discussion at the MOU Framework Agreement signing",
    caption: "ASREP Africa & AGAR MOU team roundtable — Isiolo, June 2026",
  },
  {
    src: "/images/gallery/asrep-agar-mou-signing-document.jpg",
    alt: "Delegation from ASREP Africa and AGAR signing the MOU Framework Agreement document at the official ceremony",
    caption: "ASREP Africa & AGAR MOU Framework document signing — Isiolo, June 2026",
  },
  {
    src: "/images/gallery/dida-fayo-presenting-mou-signing.jpg",
    alt: "ASREP Africa Executive Director Dida Fayo presenting near the ASREP thematic-focus poster at the MOU signing ceremony",
    caption: "Dida Fayo presenting at ASREP–AGAR MOU signing — June 2026",
  },
  {
    src: "/images/gallery/waso-eco-champs-line.jpg",
    alt: "Waso Eco-Champions lined up at a community tree planting event in Isiolo County",
    caption: "Waso Eco-Champions mobilise for community tree planting — Isiolo County 2024",
  },
  {
    src: "/images/gallery/community-baraza-isiolo.jpg",
    alt: "Community baraza (public meeting) convened by ASREP Africa in Isiolo, with elders and community members seated in a circle",
    caption: "Community baraza — civic engagement, Isiolo 2024",
  },
  {
    src: "/images/gallery/women-youth-climate-meeting.jpg",
    alt: "Women and youth participating in a climate resilience meeting organised by ASREP Africa",
    caption: "Women & youth climate meeting — Isiolo County 2025",
  },
  {
    src: "/images/gallery/community-planting-greens.jpg",
    alt: "Community members planting green seedlings as part of ASREP's nature-based solutions programme",
    caption: "Community tree planting — Waso Eco-Champions programme 2024",
  },
  {
    src: "/images/gallery/tree-planting-community-rocks-hero.jpg",
    alt: "Community members planting trees among rocks in the ASAL landscape of Northern Kenya",
    caption: "Tree planting in rocky ASAL terrain — Isiolo County 2024",
  },
  {
    src: "/images/gallery/kenya-forest-service-tree-planting.jpg",
    alt: "ASREP Africa and Kenya Forest Service officials jointly planting trees as part of a conservation partnership",
    caption: "ASREP Africa & Kenya Forest Service joint tree planting — 2024",
  },
  {
    src: "/images/gallery/rangers-youth-tree-planting.jpg",
    alt: "Wildlife rangers and youth volunteers planting indigenous trees under ASREP Africa's eco-champions programme",
    caption: "Rangers and youth eco-champions — tree planting, Isiolo 2024",
  },
  {
    src: "/images/gallery/tree-planting-officer-rangers.jpg",
    alt: "A forestry officer supervising rangers during an ASREP-coordinated tree planting exercise in Isiolo County",
    caption: "Forestry officer with rangers during tree planting — Isiolo 2024",
  },
  {
    src: "/images/gallery/tree-nursery-asrep-leader.jpg",
    alt: "ASREP Africa team leader at a tree nursery showing indigenous seedlings ready for community planting",
    caption: "Indigenous tree nursery — Waso Eco-Champions programme 2025",
  },
  {
    src: "/images/gallery/acacia-senegal-species-sign.jpg",
    alt: "A species information sign for Acacia senegal at an ASREP-supported conservation site in Isiolo County",
    caption: "Acacia senegal conservation — ASREP biodiversity programme 2025",
  },
  {
    src: "/images/gallery/asrep-forest-partnership.jpg",
    alt: "ASREP Africa leaders meeting with Kenya Forest Service officials to formalise a conservation partnership",
    caption: "ASREP Africa – Kenya Forest Service partnership meeting 2024",
  },
  {
    src: "/images/gallery/community-women-peace-prayer.jpg",
    alt: "Women community leaders in a peace prayer circle convened by ASREP Africa's peacebuilding programme",
    caption: "Women peace prayer — Isiolo Peace Actors Forum 2025",
  },
  {
    src: "/images/gallery/community-roundtable-isiolo.jpg",
    alt: "ASREP Africa-facilitated community roundtable with mixed elders, women, and youth representatives in Isiolo",
    caption: "Community roundtable — inter-community dialogue, Isiolo 2025",
  },
  {
    src: "/images/gallery/asrep-community-team-group.jpg",
    alt: "ASREP Africa community team group photo with programme staff and community partners in Isiolo County",
    caption: "ASREP Africa community team — Isiolo County 2025",
  },
  {
    src: "/images/gallery/interfaith-peace-pastor.jpg",
    alt: "A faith leader facilitating an interfaith peace and reconciliation session as part of ASREP's PROCMURA partnership",
    caption: "Interfaith peace facilitation — PROCMURA & ASREP 2025",
  },
  {
    src: "/images/gallery/asrep-officials-procmura-faith-leaders-peace-session-nairobi.jpg",
    alt: "ASREP Africa officials and PROCMURA faith leaders at a joint peacebuilding session in Nairobi",
    caption: "ASREP & PROCMURA peace session — Nairobi 2025",
  },
  {
    src: "/images/gallery/sdzwa-k-biodiversity-strategy-validation-meeting-laikipia.jpg",
    alt: "ASREP Africa and San Diego Zoo Wildlife Alliance Kenya officials at the national biodiversity strategy validation meeting in Laikipia",
    caption: "National Biodiversity Strategy validation — ASREP & SDZWA-K, Laikipia 2026",
  },
  {
    src: "/images/gallery/asrep-elders-strategic-meeting.jpg",
    alt: "ASREP Africa executive and community elders at a strategic planning and indigenous knowledge meeting",
    caption: "ASREP elders strategic meeting — indigenous knowledge, Isiolo 2025",
  },
  {
    src: "/images/gallery/asrep-iua-mou-leaders.jpg",
    alt: "ASREP Africa and Inclusion Unfolding Africa leaders signing an MOU partnership agreement",
    caption: "ASREP Africa & IUA MOU signing — partnership 2025",
  },
  {
    src: "/images/gallery/forest-officer-community-talk.jpg",
    alt: "A Kenya Forest Service officer giving a community awareness talk at an ASREP Africa conservation event",
    caption: "Forest officer community awareness talk — Isiolo County 2024",
  },
  {
    src: "/images/gallery/nagaa-local-radio-dida-public-sensitization.jpg",
    alt: "ASREP Africa Executive Director Dida Fayo speaking on Nagaa FM local radio for community public sensitization",
    caption: "ED Dida Fayo on Nagaa FM local radio — public sensitization 2025",
  },
  {
    src: "/images/gallery/executive-director-presenting.jpg",
    alt: "ASREP Africa Executive Director presenting programme findings and impact to an audience of stakeholders",
    caption: "Executive Director presenting ASREP impact findings 2025",
  },
  {
    src: "/images/gallery/executive-director-with-officials.jpg",
    alt: "ASREP Africa Executive Director with county government officials and partner representatives in Isiolo",
    caption: "Executive Director with county officials — Isiolo County 2025",
  },
  {
    src: "/images/gallery/dida-fayo-remarks-under-tree-series-launch-oldonyiro.jpg",
    alt: "ASREP Africa Executive Director Dida Fayo giving keynote remarks at the KSG Under the Tree Series launch in Oldonyiro, Isiolo",
    caption: "Dida Fayo at KSG Under the Tree Series launch — Oldonyiro 2025",
  },
  {
    src: "/images/gallery/dida-fayo-panel-st-pauls-university.jpg",
    alt: "ASREP Africa Executive Director Dida Fayo on a panel at St Paul's University, Nairobi, discussing ASAL development",
    caption: "Dida Fayo at St Paul's University panel — Nairobi 2025",
  },
  {
    src: "/images/gallery/borana-elder-portrait-hero.jpg",
    alt: "Portrait of a Borana Oromo elder from Isiolo County whose indigenous knowledge is being documented by ASREP Africa's IK Vault Series",
    caption: "Borana elder — ASAL IK Vault Series, Isiolo County 2025",
  },
  {
    src: "/images/gallery/portrait-asrep-leader-writing.jpg",
    alt: "An ASREP Africa programme leader documenting indigenous knowledge and research findings in the field",
    caption: "ASREP programme leader documenting field research 2025",
  },
  {
    src: "/images/gallery/portrait-asrep-staffer-cap.jpg",
    alt: "An ASREP Africa field staff member in an Isiolo County community, wearing an ASREP cap",
    caption: "ASREP Africa field staff — Isiolo County 2025",
  },
  {
    src: "/images/gallery/portrait-male-leader-pointing.jpg",
    alt: "A community leader pointing across the ASAL landscape while explaining land use and ecology to ASREP researchers",
    caption: "Community leader with ASREP researchers — Isiolo County 2025",
  },
  {
    src: "/images/gallery/samburu-drummers-dancing.jpg",
    alt: "Samburu drummers and dancers performing at an ASREP Africa community cultural event in Isiolo County",
    caption: "Samburu cultural performance — community event, Isiolo County",
  },
];

// Board member portraits in gallery
const boardGallery = [
  {
    src: "/images/leadership/dida-fayo.jpg",
    alt: "Dida E. Fayo — Executive Director of ASREP Africa, PhD Candidate, former NRT Director of Programs",
    caption: "Dida E. Fayo — Executive Director, ASREP Africa",
  },
  {
    src: "/images/leadership/nura-mohamed.jpg",
    alt: "Prof. Nura Mohamed — Non-Executive Chairman of ASREP Africa, Director General of the Kenya School of Government",
    caption: "Prof. Nura Mohamed — Non-Executive Chairman, ASREP Africa",
  },
  {
    src: "/images/leadership/jennifer-maurer.jpg",
    alt: "Jennifer Maurer — Board Strategy Advisor at ASREP Africa, 28 years with USAID and PREG portfolio",
    caption: "Jennifer Maurer — Board Strategy Advisor, ASREP Africa",
  },
  {
    src: "/images/leadership/boaz-ogada.jpg",
    alt: "Boaz Ogada — Climate Adaptation and NbS Expert on ASREP Africa's board, Bennett Institute fellow at Cambridge University",
    caption: "Boaz Ogada — Climate Adaptation & NbS Expert, ASREP Board",
  },
  {
    src: "/images/leadership/issa-gedi.jpg",
    alt: "Issa Gedi — ASAL Policy and Grants Expert on ASREP Africa's board, former NRT Chief Programs Officer",
    caption: "Issa Gedi — ASAL Policy & Grants Expert, ASREP Board",
  },
  {
    src: "/images/leadership/scholar-kiilu.jpg",
    alt: "Ven. Canon Dr. Scholar Kiilu — Peacebuilding and Gender Expert on ASREP Africa's board, St Paul's University",
    caption: "Ven. Canon Dr. Scholar Kiilu — Peacebuilding & Gender, ASREP Board",
  },
  {
    src: "/images/leadership/abudo-dambala.jpg",
    alt: "FCPA Abudo Dambala — Finance, Audit and Risk Board Member at ASREP Africa, FCPA and CISA certified",
    caption: "FCPA Abudo Dambala — Finance, Audit & Risk, ASREP Board",
  },
];

const categories = [
  { label: "All Photos", value: "all" },
  { label: "Eco-Champions", value: "eco" },
  { label: "Peacebuilding", value: "peace" },
  { label: "Research & IK", value: "research" },
  { label: "Governance", value: "civic" },
  { label: "Partnerships", value: "partner" },
  { label: "Leadership", value: "board" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="Images from the field — documenting ASREP Africa's programmes and people across Isiolo County and Kenya's ASALs."
        imageSrc="/images/gallery/waso-eco-champs-line.jpg"
        imageAlt="Waso Eco-Champions lined up at a community tree planting event in Isiolo County"
        breadcrumbs={[{ label: "Gallery" }]}
        tag="From the Field"
      />

      {/* Field & Programme Photos */}
      <section className="section-pad bg-cream" aria-labelledby="field-gallery-heading">
        <div className="container-asrep">
          <div className="mb-8">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-2">Programme Work</p>
            <h2 id="field-gallery-heading" className="font-display text-earth text-3xl font-bold">
              Field &amp; Programme <span className="text-forest">Photography</span>
            </h2>
            <p className="text-charcoal/60 text-sm mt-2">
              {fieldPhotos.length} photos documenting ASREP Africa&apos;s work. Click any image to view full size.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter photos by category">
            {categories.map((cat) => (
              <span
                key={cat.value}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer
                  ${cat.value === "all"
                    ? "bg-forest text-white border-forest"
                    : "bg-white text-charcoal/70 border-charcoal/15 hover:border-forest/40"
                  }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          <LightboxGallery images={fieldPhotos} columns={3} />
        </div>
      </section>

      {/* Board Members Gallery */}
      <section className="section-pad bg-white" aria-labelledby="board-gallery-heading">
        <div className="container-asrep">
          <div className="mb-8">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-2">Governance</p>
            <h2 id="board-gallery-heading" className="font-display text-earth text-3xl font-bold">
              Board of Directors &amp; <span className="text-forest">Executive Leadership</span>
            </h2>
            <p className="text-charcoal/60 text-sm mt-2">
              ASREP Africa&apos;s leadership team — {boardGallery.length} board members and executive staff. Click to view full size.
            </p>
          </div>

          {/* Board member grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 mb-8">
            {boardGallery.map((member, i) => (
              <Link key={i} href="/team" className="group text-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand/40 mb-3
                  shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={member.src}
                    alt={member.alt}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                  />
                </div>
                <p className="text-charcoal text-xs font-semibold leading-tight">
                  {member.caption.split(" — ")[0]}
                </p>
                <p className="text-muted text-[10px] mt-0.5 leading-tight">
                  {member.caption.split(" — ")[1]}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white
                font-semibold text-sm rounded-lg hover:bg-sage transition-colors"
            >
              View Full Team Bios
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Video CTA */}
      <section className="py-16 bg-forest" aria-label="Featured ASREP Africa video">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Thumbnail */}
            <a
              href="/videos"
              className="relative block rounded-2xl overflow-hidden shadow-2xl aspect-video group"
              aria-label="Watch ASREP Africa on our video page"
            >
              <Image
                src={`https://img.youtube.com/vi/9aJQzboyOIY/maxresdefault.jpg`}
                alt="ASREP Africa — programme video"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors
                flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center
                  shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Text */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Video</p>
              <h2 className="font-display text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
                Watch ASREP Africa{" "}
                <span className="text-gold">in Action</span>
              </h2>
              <p className="text-white/65 leading-relaxed mb-7">
                Beyond the photographs — see our eco-champions, community dialogues,
                and research launches on video. More content coming to our YouTube channel.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/videos"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-forest
                    font-semibold text-sm rounded-lg hover:bg-sand transition-colors"
                >
                  View Videos
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF0000] hover:bg-[#CC0000]
                    text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
