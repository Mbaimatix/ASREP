import Image from "next/image";
import Link from "next/link";

// ASREP Africa YouTube channel: https://youtube.com/@asrepafrica
const YOUTUBE_VIDEO_ID = "9aJQzboyOIY";

export default function WhoWeAreStrip() {
  return (
    <section className="section-pad bg-cream" aria-labelledby="who-we-are-heading">
      <div className="container-asrep">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — photograph + YouTube embed */}
          <div className="space-y-5">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-forest to-sage">
              <Image
                src="/images/about/who-we-are.jpg"
                alt="ASREP Africa team and community members gathered in the Isiolo landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent">
                <p className="text-white/80 text-xs uppercase tracking-widest font-medium">
                  Isiolo County, Kenya
                </p>
              </div>
            </div>

            {/* YouTube embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="ASREP Africa — Our Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — text */}
          <div>
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Who We Are
            </p>
            <h2
              id="who-we-are-heading"
              className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight mb-6"
            >
              Locally Led. Evidence Driven.{" "}
              <span className="text-forest">Community Rooted.</span>
            </h2>

            <div className="space-y-4 text-charcoal/80 text-base md:text-lg leading-relaxed mb-8">
              <p>
                Kenya&apos;s arid and semi-arid lands cover approximately 84% of the country&apos;s
                landmass and are home to some of its most climate-vulnerable, conflict-prone,
                and historically underserved communities.
              </p>
              <p>
                ASREP Africa — the ASAL Research &amp; Resilience Programme — was founded in
                2023 and is headquartered in Isiolo County. We are a locally-led organisation
                committed to building resilience at the intersection of climate, peace, and
                governance across Kenya&apos;s ASALs.
              </p>
              <p>
                Through evidence-based programmes, indigenous knowledge systems, and deep
                community partnerships, we deliver change that endures.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🌿", label: "Nature-Based Solutions" },
                { icon: "🕊️", label: "Peacebuilding" },
                { icon: "📚", label: "Research & Evidence" },
                { icon: "🤝", label: "Community Partnership" },
              ].map((pillar) => (
                <div key={pillar.label} className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">{pillar.icon}</span>
                  <span className="text-charcoal font-medium text-sm">{pillar.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest hover:bg-sage text-white
                font-semibold text-sm rounded-lg transition-colors"
            >
              Learn More About Us
              <svg
                className="w-4 h-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
