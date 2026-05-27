"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

/* ─── Navigation data ──────────────────────────────────────────────────────── */
const navItems = [
  {
    label: "Who We Are",
    href: "/about",
    children: [
      { label: "About ASREP", href: "/about" },
      { label: "Mission, Vision & Values", href: "/about/mission-vision" },
      { label: "Our History", href: "/about/history" },
      { label: "Leadership & Governance", href: "/about/leadership" },
      { label: "Theory of Change", href: "/about/theory-of-change" },
      { label: "Institutional Policies", href: "/about/policies" },
      { label: "Our Team", href: "/team" },
    ],
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      { label: "Overview", href: "/what-we-do" },
      { label: "Climate Resilience & NbS", href: "/what-we-do/climate-resilience" },
      { label: "Peacebuilding & Social Cohesion", href: "/what-we-do/peacebuilding" },
      { label: "Research & Knowledge", href: "/what-we-do/research-knowledge" },
      { label: "Civic Governance & Youth", href: "/what-we-do/civic-governance" },
      { label: "Biodiversity Restoration", href: "/what-we-do/biodiversity" },
      { label: "Livelihoods & Empowerment", href: "/what-we-do/livelihoods" },
    ],
  },
  { label: "Our Impact", href: "/impact" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Get Involved", href: "/get-involved" },
      { label: "Donate", href: "/get-involved/donate" },
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Partner with Us", href: "/get-involved/partner" },
      { label: "Careers & Tenders", href: "/get-involved/careers" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Publications & Research", href: "/resources" },
      { label: "Our Impact", href: "/impact" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Videos", href: "/videos" },
      { label: "Events & Summits", href: "/events" },
      { label: "Institutional Policies", href: "/about/policies" },
    ],
  },
  { label: "News & Media", href: "/news" },
  { label: "Contact", href: "/contact" },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when route changes
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  // Determine if a nav item is "active" (current section)
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-forest shadow-lg"
      >
        <div className="container-asrep">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* ─── Logo ──────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 py-3"
              aria-label="ASREP Africa — Home"
            >
              <div className="relative w-9 h-9 md:w-10 md:h-10">
                <Image
                  src="/logos/asrep-logo-white.png"
                  alt="ASREP Africa logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-display font-bold text-lg md:text-xl leading-none">
                  ASREP
                  <span className="text-gold"> AFRICA</span>
                </div>
                <div className="text-white/60 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5">
                  ASAL Research & Resilience Programme
                </div>
              </div>
            </Link>

            {/* ─── Desktop Nav ───────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  {item.children ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-white
                          transition-colors rounded-md hover:bg-white/10 focus-visible:ring-2
                          focus-visible:ring-gold focus-visible:outline-none
                          ${isActive(item.href) ? "text-gold" : ""}`}
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
                        }
                        aria-expanded={openDropdown === item.label}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            onMouseEnter={() => {
                              if (closeTimer.current) clearTimeout(closeTimer.current);
                            }}
                            onMouseLeave={handleMouseLeave}
                            className="absolute top-full left-0 mt-1 w-60 bg-forest rounded-xl shadow-2xl
                              border border-white/10 overflow-hidden z-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2.5 text-sm text-white/85 hover:text-white
                                  hover:bg-sage/30 transition-colors
                                  ${pathname === child.href ? "bg-sage/20 text-gold font-medium" : ""}`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium text-white/90 hover:text-white
                        transition-colors rounded-md hover:bg-white/10
                        focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none
                        ${isActive(item.href) ? "text-gold" : ""}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Donate CTA */}
              <Link
                href="/get-involved/donate"
                className="ml-3 px-5 py-2.5 bg-cta hover:bg-cta-hover text-white text-sm font-semibold
                  rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
                  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cta
                  focus-visible:outline-none whitespace-nowrap"
              >
                Donate Now
              </Link>
            </div>

            {/* ─── Mobile: Donate + Hamburger ────────────────────────────── */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/get-involved/donate"
                className="px-4 py-2 bg-cta hover:bg-cta-hover text-white text-sm font-semibold
                  rounded-lg transition-colors"
              >
                Donate
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-18 md:h-20" aria-hidden="true" />

      {/* Mobile full-screen overlay */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        pathname={pathname}
      />
    </>
  );
}
