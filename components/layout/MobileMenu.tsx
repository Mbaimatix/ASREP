"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
};

export default function MobileMenu({ isOpen, onClose, navItems, pathname }: Props) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) =>
    setExpandedItem(expandedItem === label ? null : label);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-forest flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link
              href="/"
              onClick={onClose}
              className="inline-flex"
              aria-label="ASREP Africa — Home"
            >
              <Image
                src="/logos/asrep-logo.png"
                alt="ASREP Africa — ASAL Research & Resilience Programme"
                width={160}
                height={56}
                className="object-contain bg-white rounded-lg px-2 py-1 h-12 w-auto"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
              aria-label="Close navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-6 py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-3.5 text-left
                        text-base font-medium rounded-lg transition-colors
                        ${pathname.startsWith(item.href)
                          ? "text-gold bg-white/10"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                        }`}
                      aria-expanded={expandedItem === item.label}
                    >
                      <span>{item.label}</span>
                      <motion.svg
                        animate={{ rotate: expandedItem === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4 text-white/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {expandedItem === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 mt-1 space-y-1 border-l-2 border-sage/40 ml-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className={`block px-3 py-2.5 text-sm rounded-lg transition-colors
                                  ${pathname === child.href
                                    ? "text-gold font-medium"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                  }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block px-3 py-3.5 text-base font-medium rounded-lg transition-colors
                      ${pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-gold bg-white/10"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer CTA */}
          <div className="px-6 py-6 border-t border-white/10 space-y-3">
            <Link
              href="/get-involved/donate"
              onClick={onClose}
              className="block w-full py-4 bg-cta hover:bg-cta-hover text-white text-center
                font-semibold rounded-xl transition-colors text-base"
            >
              Donate Now
            </Link>
            <Link
              href="/get-involved/partner"
              onClick={onClose}
              className="block w-full py-4 border-2 border-white/30 hover:border-white/60
                text-white text-center font-medium rounded-xl transition-colors text-base"
            >
              Partner with Us
            </Link>
            <p className="text-center text-white/40 text-xs mt-2">
              asrepafrica@gmail.com · +254-7336-87149
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
