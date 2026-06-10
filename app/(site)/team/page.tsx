import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import LeadershipCard from "@/components/about/LeadershipCard";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and governance team of ASREP Africa — a diverse board of experts spanning climate, peacebuilding, research, governance, and finance.",
  openGraph: {
    title: "Our Team | ASREP Africa",
    description: "Meet the leadership of ASREP Africa — experts in climate, peacebuilding, research, and governance.",
    images: [{ url: "/images/about/leadership-hero.jpg", width: 1200, height: 630, alt: "ASREP Africa team" }],
  },
};

const teamMembers: {
  name: string;
  title: string;
  boardRole: "chairman" | "board" | "executive-director" | "staff";
  photo: string;
  shortBio: string;
}[] = [
  {
    name: "Dida E. Fayo",
    title: "Executive Director",
    boardRole: "executive-director",
    photo: "/images/leadership/dida-fayo.jpg",
    shortBio:
      "PhD Candidate with 15+ years in ASAL development. Former NRT Director of Programs. Architect of ASREP's programme model, with deep expertise in community-led conservation, peacebuilding, and NRT/USAID/EU/AFD partnerships.",
  },
  {
    name: "Prof. Nura Mohamed",
    title: "Non-Executive Chairman",
    boardRole: "chairman",
    photo: "/images/leadership/nura-mohamed.jpg",
    shortBio:
      "Director General of the Kenya School of Government (KSG). PhD in Economics. Holder of Commonwealth Awards and the Elder of the Order of the Burning Spear (EBS). A driving force behind Kenya's public governance reform agenda.",
  },
  {
    name: "Jennifer Maurer",
    title: "Board Strategy Advisor",
    boardRole: "board",
    photo: "/images/leadership/jennifer-maurer.jpg",
    shortBio:
      "28 years with USAID. Led the $600M PREG natural resource management portfolio across East Africa. Strategic advisor on institutional partnerships, programme design, and international donor relations.",
  },
  {
    name: "Boaz Ogada",
    title: "Climate Adaptation & NbS Expert",
    boardRole: "board",
    photo: "/images/leadership/boaz-ogada.jpg",
    shortBio:
      "Bennett Institute for Public Policy research fellow at Cambridge University. World Bank programme specialist in South Sudan. Expert in nature-based solutions, climate adaptation, and rangeland ecology.",
  },
  {
    name: "Issa Gedi",
    title: "ASAL Policy & Grants Expert",
    boardRole: "board",
    photo: "/images/leadership/issa-gedi.jpg",
    shortBio:
      "Former Chief Programs Officer at Northern Rangelands Trust (NRT). Wildlife Conservation Society Kigali. MPhil from Cambridge University. Deep expertise in ASAL policy, grants management, and conservation governance.",
  },
  {
    name: "Ven. Canon Dr. Scholar Kiilu",
    title: "Peacebuilding & Gender Expert",
    boardRole: "board",
    photo: "/images/leadership/scholar-kiilu.jpg",
    shortBio:
      "Lecturer at St. Paul's University. PhD in Theology (2025). Met Pope Francis in 2024. Specialist in community reconciliation, gender justice, interfaith dialogue, and peacebuilding in conflict-affected ASAL communities.",
  },
  {
    name: "FCPA Abudo Dambala",
    title: "Finance, Audit & Risk Board Member",
    boardRole: "board",
    photo: "/images/leadership/abudo-dambala.jpg",
    shortBio:
      "Fellow Certified Public Accountant (FCPA) and Certified Information Systems Auditor (CISA). Former roles at GOAL, PACIDA, and Co-operative Bank of Kenya. Leads ASREP's Audit & Risk Committee.",
  },
];

const staffTeam = [
  { name: "Programme Officers", count: 4, description: "Field programme delivery across climate, peace, and governance" },
  { name: "Research Team", count: 2, description: "Indigenous knowledge documentation and evidence generation" },
  { name: "Finance & Admin", count: 2, description: "Financial governance, compliance, and operations" },
  { name: "Communications", count: 1, description: "Digital communications, media relations, and content" },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="Dedicated professionals and community leaders driving ASREP Africa's mission across Kenya's ASALs."
        imageSrc="/images/about/leadership-hero.jpg"
        imageAlt="ASREP Africa leadership team and board members"
        breadcrumbs={[{ label: "Our Team" }]}
        tag="People & Governance"
      />

      {/* Board section */}
      <section className="section-pad bg-cream" aria-labelledby="board-heading">
        <div className="container-asrep">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">Leadership</p>
            <h2
              id="board-heading"
              className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight"
            >
              Board of Directors &amp;{" "}
              <span className="text-forest">Executive Team</span>
            </h2>
            <p className="text-charcoal/65 mt-4 leading-relaxed">
              ASREP&apos;s governance is led by a diverse board combining deep local ASAL expertise with
              international programme experience from organisations including USAID, NRT, Cambridge, and KSG.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {teamMembers.map((member) => (
              <LeadershipCard
                key={member.name}
                name={member.name}
                title={member.title}
                boardRole={member.boardRole}
                photo={member.photo}
                shortBio={member.shortBio}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Staff team overview */}
      <section className="section-pad bg-white" aria-labelledby="staff-heading">
        <div className="container-asrep">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">The Team</p>
            <h2 id="staff-heading" className="font-display text-earth text-2xl md:text-3xl font-bold">
              Our Programme Staff
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {staffTeam.map((dept) => (
              <div key={dept.name} className="text-center p-7 bg-cream rounded-2xl border border-charcoal/8">
                <div className="font-display text-4xl font-bold text-forest mb-2">{dept.count}</div>
                <h3 className="font-semibold text-charcoal text-sm mb-2">{dept.name}</h3>
                <p className="text-charcoal/55 text-xs leading-relaxed">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="section-pad bg-forest" aria-labelledby="join-team-heading">
        <div className="container-asrep max-w-3xl text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Join Us</p>
          <h2 id="join-team-heading" className="font-display text-white text-3xl font-bold mb-5">
            Want to Work with ASREP Africa?
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            We regularly advertise positions in programme management, research, communications, and
            field coordination. We also welcome volunteers and research attachments.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/get-involved/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest
                font-semibold rounded-xl hover:bg-cream transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="/get-involved/volunteer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white
                font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-colors"
            >
              Apply to Volunteer
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
