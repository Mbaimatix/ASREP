import Link from "next/link";
import Image from "next/image";

const coverage = [
  {
    publication: "Biographic Magazine",
    logo: "/logos/biographic-logo.png",
    headline: "The Future of Conservation Without US Aid",
    excerpt:
      "Biographic Magazine profiles ASREP's Waso Eco-Champs as a model for locally-funded, community-led conservation in an era of declining international aid.",
    date: "2026",
    href: "https://www.biographic.com/the-future-of-conservation-without-us-aid/",
    logoAlt: "Biographic Magazine",
  },
  {
    publication: "The Guardian",
    logo: "/logos/guardian-logo.png",
    headline: "Conservation in the Age of Trump Aid Cuts",
    excerpt:
      "The Guardian's global environment desk highlights ASREP alongside leading conservation voices navigating the challenge of USAID funding reductions.",
    date: "March 2026",
    href: "https://www.theguardian.com/environment/2026/mar/16/conservation-trump-cuts-natural-world-usaid-funding-biodiversity-aoe",
    logoAlt: "The Guardian",
  },
  {
    publication: "Standard Digital",
    logo: "/logos/standard-logo.png",
    headline: "Isiolo Banks on Eco-Champions to Empower Communities",
    excerpt:
      "Kenya's Standard Media reports on how eco-champions are reshaping conservation governance and community livelihoods in Isiolo County.",
    date: "2025",
    href: "https://www.standardmedia.co.ke/environment-climate/article/2001536345/isiolo-banks-on-eco-champions-to-empower-communities-on-conservation",
    logoAlt: "Standard Digital",
  },
];

export default function GlobalRecognitionStrip() {
  return (
    <section
      className="section-pad bg-sand/40"
      aria-labelledby="recognition-heading"
    >
      <div className="container-asrep">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Global Recognition
          </p>
          <h2
            id="recognition-heading"
            className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            Our Work, Recognised{" "}
            <span className="text-forest">Worldwide</span>
          </h2>
          <p className="text-charcoal/65 text-base leading-relaxed">
            ASREP&apos;s community-led conservation and peacebuilding work has captured the
            attention of leading global media outlets.
          </p>
        </div>

        {/* Media cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
          {coverage.map((item) => (
            <article
              key={item.href}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-all duration-300 flex flex-col"
            >
              {/* Publication wordmark */}
              <div className="h-10 mb-5 flex items-center">
                {item.publication === "The Guardian" ? (
                  <div className="relative h-8 w-32">
                    <Image
                      src="/logos/guardian-logo.jpg"
                      alt="The Guardian newspaper logo"
                      fill
                      className="object-contain object-left"
                      sizes="128px"
                    />
                  </div>
                ) : (
                  <span className="font-display font-bold text-charcoal text-sm tracking-wide border-b-2 border-earth/30 pb-0.5">
                    {item.publication}
                  </span>
                )}
              </div>

              {/* Date pill */}
              <span className="inline-block text-xs text-muted font-medium mb-3">{item.date}</span>

              {/* Headline */}
              <h3 className="font-display font-bold text-charcoal text-lg leading-snug mb-3">
                &ldquo;{item.headline}&rdquo;
              </h3>

              {/* Excerpt */}
              <p className="text-charcoal/60 text-sm leading-relaxed flex-1 mb-5">
                {item.excerpt}
              </p>

              {/* External link */}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest font-semibold text-sm
                  hover:text-sage transition-colors group"
                aria-label={`Read full article on ${item.publication} (opens in new tab)`}
              >
                Read Full Article
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* Divider strip */}
        <div className="border-t border-charcoal/10 pt-10 text-center">
          <p className="text-muted text-sm mb-2">Also featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: "People Daily Kenya", href: "https://epaper.peopledaily.digital" },
              { name: "Interpeace", href: "https://www.interpeace.org" },
              { name: "Alliance for Peacebuilding", href: "https://www.allianceforpeacebuilding.org" },
              { name: "San Diego Zoo Wildlife Alliance", href: "https://science.sandiegozoo.org" },
            ].map((mention) => (
              <a
                key={mention.name}
                href={mention.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/50 hover:text-forest text-sm font-medium transition-colors"
              >
                {mention.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
