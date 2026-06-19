import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import LeadershipCard from "@/components/about/LeadershipCard";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description:
    "Meet ASREP Africa's Board of Directors and Executive Director — a team of ASAL specialists, peacebuilders, researchers, and development professionals committed to resilient communities.",
};

const boardMembers = [
  {
    name: "Prof. Nura Mohamed",
    title: "Director General, Kenya School of Government",
    boardRole: "chairman" as const,
    credentials: "PhD Economics · EBS · Commonwealth Awards",
    photo: "/images/leadership/nura-mohamed.jpg",
    shortBio:
      "Non-Executive Chairman of ASREP Africa. Professor Nura Mohamed serves concurrently as Director General of the Kenya School of Government, bringing unparalleled access to governance infrastructure and policy networks across all 47 counties.",
    fullBio:
      "A distinguished academic and public servant, Prof. Nura Mohamed holds a PhD in Economics and has received the Elder of the Burning Spear (EBS) state honour and Commonwealth Awards for public service. His leadership of KSG has transformed it into Kenya's premier civic capacity development institution, and his stewardship of the ASREP board ensures alignment between community-level programming and national governance priorities. He is the architect of the KSG 'Under the Tree' Series that now scales from Isiolo to all 47 counties.",
  },
  {
    name: "Jennifer Maurer",
    title: "Board Strategy Advisor",
    boardRole: "board" as const,
    credentials: "28 Years USAID · $600M PREG Portfolio",
    photo: "/images/leadership/jennifer-maurer.jpg",
    shortBio:
      "A veteran of 28 years at the United States Agency for International Development (USAID), Jennifer led the $600M+ PREG (Pastoralist Resilience and Environment Governance) portfolio — one of the largest development investments in Kenya's ASAL regions.",
    fullBio:
      "Jennifer Maurer brings an unmatched depth of institutional knowledge about ASAL development financing, international donor relations, and programme design. Her tenure at USAID saw her oversee transformative investments in Northern Kenya covering climate adaptation, livelihoods, governance, and conflict management. As ASREP's Board Strategy Advisor, she guides the organisation's fundraising architecture, institutional partnerships, and strategic positioning for international grant opportunities.",
  },
  {
    name: "Boaz Ogada",
    title: "Climate Adaptation & Nature-Based Solutions Expert",
    boardRole: "board" as const,
    credentials: "Bennett Institute · University of Cambridge · World Bank South Sudan",
    photo: "/images/leadership/boaz-ogada.jpg",
    shortBio:
      "A policy fellow at the Bennett Institute for Public Policy at the University of Cambridge, Boaz has advised the World Bank in South Sudan and brings cutting-edge NbS and climate adaptation thinking to ASREP's board.",
    fullBio:
      "Boaz Ogada's academic and advisory career spans climate finance, policy reform, and nature-based solutions across East and Central Africa. His research at Cambridge's Bennett Institute informs ASREP's technical approach to ecosystem restoration, carbon finance potential, and climate-smart land management. His experience with the World Bank in South Sudan gives him deep insight into the political economy of conservation in fragile ASAL contexts, directly shaping the Waso Eco-Champs programme design.",
  },
  {
    name: "Issa Gedi",
    title: "ASAL Policy & Grants Expert",
    boardRole: "board" as const,
    credentials: "Former NRT Chief Programs Officer · MPhil University of Cambridge · WCS Kigali",
    photo: "/images/leadership/issa-gedi.jpg",
    shortBio:
      "A Northern Kenya conservation and policy veteran, Issa previously served as Chief Programs Officer at the Northern Rangelands Trust (NRT) and holds an MPhil from the University of Cambridge. He has also worked with the Wildlife Conservation Society in Kigali.",
    fullBio:
      "Issa Gedi combines rare academic credibility with on-the-ground ASAL programme delivery experience at the highest levels. His tenure at NRT gave him institutional fluency in community conservancy governance, M&E systems, donor compliance, and scaling of conservation programmes in Kenya's north. His Cambridge MPhil enriched this practical experience with rigorous research methodologies. As an ASREP board member, he provides leadership on grants strategy, NRT/government relations, and programme technical quality.",
  },
  {
    name: "Ven. Canon Dr. Scholar Kiilu",
    title: "Director, Peacebuilding & Gender Mainstreaming",
    boardRole: "board" as const,
    credentials: "PhD Theology 2025 · St Paul's University · Met Pope Francis 2024",
    photo: "/images/leadership/scholar-kiilu.jpg",
    shortBio:
      "A canon and theologian at St Paul's University with a PhD in Theology (2025), Dr. Kiilu brings interfaith peacebuilding expertise and gender mainstreaming leadership to ASREP's governance. She was received by Pope Francis in 2024.",
    fullBio:
      "Ven. Canon Dr. Scholar Kiilu is one of Kenya's most distinguished voices on interfaith dialogue and gender justice. Her theological scholarship is grounded in decades of community peacebuilding across ethnically and religiously diverse communities in Kenya. Her 2025 PhD focused on theology of reconciliation, and her 2024 papal audience reflects her standing in global faith-based development circles. At ASREP, she chairs the board's peacebuilding and gender equity oversight, ensuring that ASREP's social cohesion programmes are theologically informed, community-grounded, and transformatively inclusive.",
  },
  {
    name: "FCPA Abudo Dambala",
    title: "Director, Finance, Audit & Risk",
    boardRole: "board" as const,
    credentials: "FCPA · CISA · Former GOAL, PACIDA, Co-operative Bank",
    photo: "/images/leadership/abudo-dambala.jpg",
    shortBio:
      "A Fellow Certified Public Accountant and Certified Information Systems Auditor (CISA), Abudo brings institutional financial rigour to ASREP from senior roles at GOAL International, PACIDA, and Co-operative Bank of Kenya.",
    fullBio:
      "FCPA Abudo Dambala is ASREP's financial and audit custodian on the board. His career spans NGO financial management, internal audit, and banking — giving him a uniquely rounded understanding of the compliance, risk, and financial integrity requirements that donors and regulators expect. His work at GOAL International, one of the world's largest humanitarian organisations, and at PACIDA (Pastoralist Community Initiative and Development Assistance) in Northern Kenya gave him specific ASAL NGO financial management expertise. He oversees ASREP's financial policies and ensures audit-readiness for all major grant programmes.",
  },
  {
    name: "Dida E. Fayo",
    title: "Executive Director, ASREP Africa",
    boardRole: "executive-director" as const,
    credentials: "PhD Candidate · Former NRT Director of Programs · 15+ Years ASAL Experience",
    photo: "/images/leadership/dida-fayo.jpg",
    shortBio:
      "Founder and Executive Director of ASREP Africa, Dida Fayo brings 15+ years of frontline ASAL programme leadership, including as Director of Programs at the Northern Rangelands Trust. He has built partnerships with USAID, the EU, Agence Française de Développement, and Mercy Corps.",
    fullBio:
      "Dida E. Fayo is the visionary and operational lead of ASREP Africa. His career in Kenya's ASAL development sector is defined by deep community trust, exceptional programme delivery, and a distinctive capacity to translate grassroots insights into institutional-quality programmes. As NRT Director of Programs, he oversaw multi-million dollar portfolios spanning livelihoods, conservation, and governance across dozens of community conservancies in Northern Kenya. He is currently pursuing a PhD, and his research feeds directly into ASREP's knowledge generation mandate. Under his leadership in just two years, ASREP has planted 10,000 trees, developed 23 policies, and achieved global media recognition.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        title="Leadership & Governance"
        subtitle="A board and executive team united by deep ASAL expertise, institutional credibility, and an unwavering commitment to community-led change."
        imageSrc="/images/about/leadership-hero.jpg"
        imageAlt="ASREP Africa leadership team in session at Isiolo headquarters"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Leadership & Governance" },
        ]}
        tag="Our People"
      />

      {/* Board */}
      <section className="section-pad bg-cream" aria-labelledby="board-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Board of Directors"
            title="Governance by the"
            titleHighlight="Best in the Field"
            subtitle="ASREP's board combines ASAL policy expertise, international development experience, climate science, peacebuilding, theology, and financial rigour."
            id="board-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <LeadershipCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Governance statement */}
      <section className="section-pad bg-forest" aria-labelledby="governance-statement">
        <div className="container-asrep max-w-3xl text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Our Governance Commitment
          </p>
          <h2 id="governance-statement" className="font-display text-white text-3xl md:text-4xl font-bold mb-6">
            Accountability is Not Optional
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
            ASREP operates under 23 institutional policies across governance, finance,
            HR &amp; safeguarding, and operations. We conduct independent audits, publish
            impact data, and maintain open communication with our communities and donors.
          </p>
          <a
            href="/about/policies"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 hover:border-white
              text-white font-semibold text-sm rounded-xl transition-all"
          >
            View Institutional Policies
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
