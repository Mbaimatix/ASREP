"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  { value: 10, suffix: "", label: "Wards Covered", sublabel: "across Isiolo County" },
  { value: 2000, suffix: "+", label: "People Reached", sublabel: "eco-champions & community members" },
  { value: 500, suffix: "+", label: "Peacebuilding", sublabel: "actors engaged" },
  { value: 23, suffix: "", label: "Policies Developed", sublabel: "governance & safeguarding" },
  { value: 60, suffix: "%", label: "Women & Youth", sublabel: "in all programmes" },
];

export default function ImpactNumbersBar() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={ref}
      className="bg-forest py-14 md:py-16"
      aria-label="ASREP impact at a glance"
    >
      <div className="container-asrep">
        {/* Section label */}
        <p className="text-center text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-10">
          Impact at a Glance · 2023 – 2026
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center group"
            >
              {/* Number */}
              <div className="flex items-baseline justify-center gap-0.5 mb-1.5">
                <span
                  className="font-display text-white text-4xl md:text-5xl font-bold leading-none"
                  aria-label={`${stat.value.toLocaleString("en")}${stat.suffix}`}
                >
                  {inView && !reducedMotion ? (
                    <CountUp
                      end={stat.value}
                      duration={1.8}
                      delay={i * 0.15}
                      separator=","
                      useEasing
                    />
                  ) : (
                    stat.value.toLocaleString("en")
                  )}
                </span>
                {stat.suffix && (
                  <span className="font-display text-gold text-3xl md:text-4xl font-bold leading-none">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-white font-semibold text-sm mb-0.5">{stat.label}</p>

              {/* Sublabel */}
              <p className="text-white/45 text-xs leading-relaxed">{stat.sublabel}</p>

              {/* Divider — hide on last item on large screens */}
              {i < stats.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-1/4 h-1/2 w-px bg-white/10"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/impact"
            className="inline-flex items-center gap-2 text-gold hover:text-white text-sm font-medium
              transition-colors group"
          >
            View Our Full Impact Report
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
