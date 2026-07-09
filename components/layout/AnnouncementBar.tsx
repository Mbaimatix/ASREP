"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Announcement = { id: string; headline: string; href: string };

// Add more items here later; the bar auto-rotates through them.
const announcements: Announcement[] = [
  {
    id: "afp-2026",
    headline: "ASREP joins the Global Alliance for Peacebuilding",
    href: "/news/asrep-joins-alliance-for-peacebuilding",
  },
];

// Per-session dismissal: cleared when the browser session ends, so the
// announcement reappears on the next visit rather than being hidden forever.
const STORAGE_KEY = "asrep-announcement-dismissed";
const ROTATE_MS = 5500;

type Props = { className?: string };

export default function AnnouncementBar({ className = "" }: Props) {
  // Start hidden so server-render and first client-render match (no hydration
  // flash); reveal after mount unless dismissed this session.
  const [hidden, setHidden] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      setHidden(window.sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  useEffect(() => {
    if (hidden || paused || reduceMotion || announcements.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      ROTATE_MS
    );
    return () => clearInterval(t);
  }, [hidden, paused, reduceMotion]);

  if (hidden || announcements.length === 0) return null;

  const item = announcements[index];

  const dismiss = () => {
    setHidden(true);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage unavailable — dismiss for this render only */
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-2.5 min-w-0 ${className}`}
      role="region"
      aria-label="Site announcement"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-gold">
        News
      </span>

      <div className="relative min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="min-w-0"
          >
            <Link
              href={item.href}
              className="group inline-flex items-center gap-2 min-w-0 max-w-full
                text-sand text-xs hover:text-gold transition-colors"
            >
              <span className="truncate">{item.headline}</span>
              <span className="shrink-0 font-semibold underline underline-offset-2
                decoration-gold/50 group-hover:decoration-gold">
                Read more
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="shrink-0 text-sand/70 hover:text-gold rounded transition-colors
          focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
