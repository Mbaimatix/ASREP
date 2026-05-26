"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type Props = {
  items: AccordionItem[];
  /** Allow multiple panels open at once */
  allowMultiple?: boolean;
};

export default function Accordion({ items, allowMultiple = false }: Props) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isOpen = (id: string) => openIds.includes(id);

  return (
    <div className="divide-y divide-charcoal/10" role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <button
            type="button"
            onClick={() => toggle(item.id)}
            aria-expanded={isOpen(item.id)}
            aria-controls={`accordion-panel-${item.id}`}
            id={`accordion-btn-${item.id}`}
            className="w-full flex items-center justify-between px-0 py-5 text-left
              group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest
              rounded-sm"
          >
            <span className="font-semibold text-charcoal text-base pr-6 group-hover:text-forest transition-colors">
              {item.title}
            </span>
            <motion.span
              animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 w-6 h-6 rounded-full bg-forest/10 flex items-center justify-center
                group-hover:bg-forest/20 transition-colors"
              aria-hidden="true"
            >
              <svg className="w-3.5 h-3.5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen(item.id) && (
              <motion.div
                id={`accordion-panel-${item.id}`}
                role="region"
                aria-labelledby={`accordion-btn-${item.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-5 text-charcoal/70 text-sm md:text-base leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
