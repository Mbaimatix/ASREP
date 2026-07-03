"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/images/hero/ewaso-nyiro-aerial-hero.jpg",
    alt: "Aerial view of the Ewaso Ny'iro River flowing between green riverbank woodland and semi-arid rangelands in Isiolo County",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Community peace dialogue under an acacia tree in Northern Kenya",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Women and youth leaders participating in civic governance training",
  },
  {
    src: "/images/hero/asrep-agar-mou-group-hero.jpg",
    alt: "ASREP Africa and AGAR representatives holding the signed MoU and the ASREP 2025–2026 Impact Report",
  },
  {
    src: "/images/hero/hero-5.jpg",
    alt: "Panoramic view of the Waso Nyiro river valley at dawn, Isiolo",
  },
  {
    src: "/images/hero/hero-6.jpg",
    alt: "Aerial view of the Ewaso Ny'iro River winding through Kenya's ASAL rangelands",
  },
  {
    src: "/images/hero/hero-7.jpg",
    alt: "The Ewaso Ny'iro River flowing past acacia woodland and volcanic hills in Northern Kenya",
  },
  {
    src: "/images/hero/hero-8.jpg",
    alt: "Seasonal river cutting across the semi-arid landscape of Isiolo County, Kenya",
  },
];

const SLIDE_INTERVAL = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, next]);

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[950px] w-full overflow-hidden bg-forest"
      aria-label="ASREP Africa hero — advancing resilience, restoring nature, sustaining peace"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Slides ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {/* Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: (SLIDE_INTERVAL / 1000) * 1.2, ease: "linear" }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Dark gradient overlay ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Text block — centred ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <p
              className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              ASAL Research &amp; Resilience Programme &middot; Kenya
            </p>

            {/* H1 — gold / white / gold, text-shadow cascades to all children */}
            <h1
              className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
            >
              <span className="text-gold">Advancing Resilience.</span>{" "}
              <br className="hidden sm:block" />
              <span className="text-gold">Restoring Nature.</span>{" "}
              <br className="hidden sm:block" />
              <span className="text-gold">Sustaining Peace.</span>
            </h1>

            {/* Subline */}
            <p
              className="text-white/85 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
            >
              Building resilient communities across Kenya&apos;s arid and semi-arid lands
              through evidence, culture, and community-led action.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cta hover:bg-cta-hover text-white
                  font-semibold text-base rounded-xl transition-all duration-200 hover:shadow-xl
                  hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
              >
                Explore Our Work
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 text-white
                  font-semibold text-base rounded-xl border border-white/30 hover:border-white/60
                  transition-all duration-200 backdrop-blur-sm"
              >
                Who We Are
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Prev / Next arrows ───────────────────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30
          w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 border border-white/20
          flex items-center justify-center text-white transition-all duration-200
          hover:scale-110 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30
          w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 border border-white/20
          flex items-center justify-center text-white transition-all duration-200
          hover:scale-110 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Slide indicators ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Hero image navigation"
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-current={i === current ? "true" : undefined}
            aria-label={`Slide ${i + 1}: ${slide.alt}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-400
              focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none
              ${i === current ? "w-10 bg-gold" : "w-3 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>

      {/* ── Pause indicator (shown only when paused) ────────────────────── */}
      {isPaused && (
        <div className="absolute bottom-10 right-6 z-20" aria-hidden="true">
          <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center gap-0.5">
            <span className="w-1 h-3 bg-white/70 rounded-full block" />
            <span className="w-1 h-3 bg-white/70 rounded-full block" />
          </div>
        </div>
      )}
    </section>
  );
}
