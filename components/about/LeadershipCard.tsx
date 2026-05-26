"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  name: string;
  title: string;
  boardRole: "chairman" | "board" | "executive-director" | "staff";
  photo?: string;
  shortBio: string;
  fullBio?: string;
  credentials?: string;
  linkedIn?: string;
};

const roleLabels: Record<string, string> = {
  chairman: "Non-Executive Chairman",
  board: "Board Director",
  "executive-director": "Executive Director",
  staff: "Staff",
};

const roleColour: Record<string, string> = {
  chairman: "bg-gold/15 text-earth",
  board: "bg-forest/10 text-forest",
  "executive-director": "bg-cta/10 text-cta",
  staff: "bg-sage/10 text-sage",
};

export default function LeadershipCard({
  name,
  title,
  boardRole,
  photo,
  shortBio,
  fullBio,
  credentials,
  linkedIn,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg
      transition-shadow duration-300 flex flex-col">
      {/* Photo */}
      <div className="relative h-64 bg-sand/40">
        {photo ? (
          <Image
            src={photo}
            alt={`Portrait of ${name}, ${title}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-forest/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        )}
        {/* Role pill */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColour[boardRole]}`}>
            {roleLabels[boardRole]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-bold text-earth text-xl leading-snug mb-0.5">{name}</h3>
        {credentials && (
          <p className="text-muted text-xs font-medium mb-1">{credentials}</p>
        )}
        <p className="text-forest text-sm font-medium mb-4">{title}</p>
        <p className="text-charcoal/65 text-sm leading-relaxed mb-4">{shortBio}</p>

        {/* Expandable full bio */}
        {fullBio && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-charcoal/65 text-sm leading-relaxed pb-4 border-t border-charcoal/8 pt-4">
                    {fullBio}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-forest text-sm font-semibold
                hover:text-sage transition-colors mt-auto focus-visible:ring-2
                focus-visible:ring-forest focus-visible:outline-none rounded-sm"
              aria-expanded={expanded}
            >
              {expanded ? "Show Less" : "Full Biography"}
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          </>
        )}

        {/* LinkedIn */}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 pt-4 border-t border-charcoal/8 flex items-center gap-2
              text-muted hover:text-forest text-xs font-medium transition-colors"
            aria-label={`${name} on LinkedIn (opens in new tab)`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
            </svg>
            LinkedIn Profile
          </a>
        )}
      </div>
    </div>
  );
}
