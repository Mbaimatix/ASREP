export default function PullQuoteSection() {
  return (
    <section
      className="bg-forest section-pad relative overflow-hidden"
      aria-label="Pull quote — ASAL Indigenous Knowledge Vault"
    >
      {/* Decorative background element */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
          rounded-full bg-sage/5 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gold/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-asrep relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative open-quote */}
          <div
            className="font-display text-gold/30 text-9xl leading-none mb-2 select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <blockquote className="relative">
            <p className="font-display text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]
              font-bold leading-snug md:leading-tight mb-8 italic">
              In the Borana Oromo Indigenous culture, three things stand above all else:{" "}
              <span className="text-gold">Cows. Women. Land.</span>{" "}
              Nothing in the universe rivals their value.
            </p>

            <footer className="flex flex-col items-center gap-1">
              <div className="w-12 h-0.5 bg-gold/50 mb-4" aria-hidden="true" />
              <cite className="not-italic">
                <p className="text-gold font-semibold text-sm uppercase tracking-widest">
                  ASAL Indigenous Knowledge Vault Series
                </p>
                <p className="text-white/55 text-sm mt-1">
                  Debut Release — Borana Oromo Heritage, Isiolo County, Kenya
                </p>
              </cite>
            </footer>
          </blockquote>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-gold
                hover:bg-gold hover:text-forest font-semibold text-sm rounded-lg transition-all duration-200
                focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              Read the Full Series
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
