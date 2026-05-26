"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "inputs",
    label: "Inputs",
    short: "Community leadership, donor funding, evidence, indigenous knowledge",
    detail:
      "ASREP mobilises locally-led partnerships, funding from institutional donors and individual contributors, a growing body of ASAL-specific research, and deep respect for indigenous knowledge systems developed over centuries by ASAL communities.",
    colour: "bg-sand border-earth/20",
    textColour: "text-earth",
    number: "01",
  },
  {
    id: "activities",
    label: "Activities",
    short: "Eco-champion training, peace dialogues, civic forums, research documentation",
    detail:
      "We deliver integrated programmes: training 2,000+ Waso Eco-Champions in NbS and conservation; convening Isiolo Peace Actor Forums; running KSG 'Under the Tree' civic governance sessions; and systematically documenting indigenous knowledge via the ASAL IK Vault Series.",
    colour: "bg-sage/10 border-sage/30",
    textColour: "text-forest",
    number: "02",
  },
  {
    id: "outputs",
    label: "Outputs",
    short: "10,000 trees, 23 policies, 500 peace actors, IK publications",
    detail:
      "Measurable deliverables include 10,000 trees planted across Isiolo; 23 governance and safeguarding policies developed; 500 peace actors engaged; the debut ASAL IK Vault publication; KSG civic governance rollout; and the eco-entrepreneurship skills programme.",
    colour: "bg-forest/8 border-forest/20",
    textColour: "text-forest",
    number: "03",
  },
  {
    id: "outcomes",
    label: "Outcomes",
    short: "Restored landscapes, reduced conflict, empowered youth, evidence uptake",
    detail:
      "Communities experience measurable shifts: landscape restoration and improved biodiversity; reduced inter-community resource conflicts; increased women and youth leadership (60%+ participation); indigenous knowledge entering policy discourse; and strengthened civic engagement at county level.",
    colour: "bg-gold/8 border-gold/25",
    textColour: "text-earth",
    number: "04",
  },
  {
    id: "impact",
    label: "Impact",
    short: "Climate-resilient, peaceful, self-governing ASAL communities",
    detail:
      "The ultimate vision: ASAL communities that are climate-adaptive and ecologically healthy; that resolve disputes through dialogue and shared identity; that govern themselves with accountability and inclusion; and whose indigenous knowledge and livelihoods are preserved for future generations.",
    colour: "bg-forest border-forest",
    textColour: "text-white",
    number: "05",
  },
];

export default function TheoryOfChangeFlow() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Flow boxes */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-stretch">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col md:flex-row items-stretch flex-1">
            {/* Box */}
            <button
              onClick={() => setActiveId(activeId === step.id ? null : step.id)}
              aria-expanded={activeId === step.id}
              className={`flex flex-col items-start p-5 rounded-xl md:rounded-none
                ${i === 0 ? "md:rounded-l-xl" : ""}
                ${i === steps.length - 1 ? "md:rounded-r-xl" : ""}
                border-2 w-full text-left flex-1 transition-all duration-200
                hover:shadow-md focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none
                ${step.colour}`}
            >
              <span className={`text-xs font-bold opacity-40 mb-2 ${step.textColour}`}>
                {step.number}
              </span>
              <span className={`font-display font-bold text-lg mb-2 ${step.textColour}`}>
                {step.label}
              </span>
              <span className={`text-xs leading-relaxed opacity-70 ${step.textColour}`}>
                {step.short}
              </span>
              <span
                className={`mt-3 text-xs font-medium flex items-center gap-1 ${step.textColour} opacity-60`}
              >
                {activeId === step.id ? "Hide detail" : "Show detail"}
                <motion.svg
                  animate={{ rotate: activeId === step.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </span>
            </button>

            {/* Arrow between boxes on desktop */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center w-6 shrink-0" aria-hidden="true">
                <svg className="w-4 h-4 text-charcoal/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-cream rounded-xl border border-charcoal/8">
              {steps.filter((s) => s.id === activeId).map((step) => (
                <div key={step.id}>
                  <h4 className="font-display font-bold text-earth text-lg mb-2">
                    {step.number} — {step.label}
                  </h4>
                  <p className="text-charcoal/70 text-sm md:text-base leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NB Anchor */}
      <p className="text-muted text-xs mt-6 italic text-center">
        Source: ASREP Africa Theory of Change Framework, Impact Report 2025–2026
      </p>
    </div>
  );
}
