import Link from "next/link";

const ctas = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Donate",
    description:
      "Every contribution funds tree seedlings, peace dialogues, and community research in Kenya's ASALs.",
    cta: "Donate Now",
    href: "/get-involved/donate",
    style: "bg-cta hover:bg-cta-hover text-white",
    highlight: true,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Partner with Us",
    description:
      "Align your institution, foundation, or corporate CSR with proven, locally-led programmes across Northern Kenya.",
    cta: "Explore Partnership",
    href: "/get-involved/partner",
    style: "border-2 border-white/50 hover:border-white text-white hover:bg-white/10",
    highlight: false,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Volunteer",
    description:
      "Contribute your skills — research, communications, field work, or mentorship — to grassroots resilience in the ASALs.",
    cta: "Join as Volunteer",
    href: "/get-involved/volunteer",
    style: "border-2 border-white/50 hover:border-white text-white hover:bg-white/10",
    highlight: false,
  },
];

export default function GetInvolvedCTABand() {
  return (
    <section
      className="bg-earth section-pad"
      aria-labelledby="get-involved-heading"
    >
      <div className="container-asrep">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Get Involved
          </p>
          <h2
            id="get-involved-heading"
            className="font-display text-white text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            You Can Help Build{" "}
            <span className="text-gold">Resilient Communities</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            Whether you give, partner, or volunteer — your support helps ASREP Africa
            deliver lasting change across Kenya&apos;s arid and semi-arid lands.
          </p>
        </div>

        {/* CTA columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {ctas.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl p-8 flex flex-col items-start
                ${item.highlight ? "bg-white/10 ring-2 ring-white/20" : "bg-white/5"}`}
            >
              <div className="text-gold mb-5">{item.icon}</div>
              <h3 className="font-display font-bold text-white text-2xl mb-3">
                {item.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed mb-7 flex-1">
                {item.description}
              </p>
              <Link
                href={item.href}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                  text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold
                  focus-visible:outline-none ${item.style}`}
              >
                {item.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
