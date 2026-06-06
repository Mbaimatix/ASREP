"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";

/* ─── Navigation data ──────────────────────────────────────────────────────── */

type NavChild = { label: string; href: string };
type NavItem  = { label: string; href: string; children?: NavChild[] };

const navItems: NavItem[] = [
  {
    label: "Who We Are",
    href: "/about",
    children: [
      { label: "About ASREP",             href: "/about" },
      { label: "Mission, Vision & Values", href: "/about/mission-vision" },
      { label: "Our History",              href: "/about/history" },
      { label: "Leadership & Governance",  href: "/about/leadership" },
      { label: "Theory of Change",         href: "/about/theory-of-change" },
      { label: "Institutional Policies",   href: "/about/policies" },
      { label: "Our Team",                 href: "/team" },
    ],
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      { label: "Overview",                        href: "/what-we-do" },
      { label: "Climate Resilience & NbS",        href: "/what-we-do/climate-resilience" },
      { label: "Peacebuilding & Social Cohesion",  href: "/what-we-do/peacebuilding" },
      { label: "Research & Knowledge",             href: "/what-we-do/research-knowledge" },
      { label: "Civic Governance & Youth",         href: "/what-we-do/civic-governance" },
      { label: "Biodiversity Restoration",         href: "/what-we-do/biodiversity" },
      { label: "Livelihoods & Empowerment",        href: "/what-we-do/livelihoods" },
      { label: "Our Impact",                       href: "/impact" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Get Involved",      href: "/get-involved" },
      { label: "Donate",            href: "/get-involved/donate" },
      { label: "Volunteer",         href: "/get-involved/volunteer" },
      { label: "Partner with Us",   href: "/get-involved/partner" },
      { label: "Careers & Tenders", href: "/get-involved/careers" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Publications & Research", href: "/resources" },
      { label: "Our Impact",              href: "/impact" },
      { label: "Photo Gallery",           href: "/gallery" },
      { label: "Videos",                  href: "/videos" },
      { label: "Events & Summits",        href: "/events" },
      { label: "Institutional Policies",  href: "/about/policies" },
      { label: "News & Media",            href: "/news" },
      { label: "Contact",                 href: "/contact" },
    ],
  },
  { label: "Our Impact",   href: "/impact" },
  { label: "News & Media", href: "/news" },
  { label: "Contact",      href: "/contact" },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const pathname    = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown + mobile menu on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown on click outside
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-lg">

        {/* ── Strip 1: TopBar — desktop only ─────────────────────────────── */}
        <div className="bg-forest hidden md:block">
          <div
            aria-label="Site contact information"
            className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between"
          >
            {/* Left: location + email */}
            <div className="flex items-center">
              <div className="text-sand text-xs flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0
                       01-1.144-.742 19.58 19.58 0 01-2.683-2.282c-1.944-2.003-3.5-4.697-3.5-8.127a8 8 0
                       1116 0c0 3.43-1.557 6.124-3.5 8.127a19.58 19.58 0 01-2.682 2.282 16.975 16.975 0
                       01-1.145.742zM12 13.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                    clipRule="evenodd"
                  />
                </svg>
                ASREP Africa · Isiolo County, Kenya
              </div>

              <span className="mx-4 h-3 border-l border-sage/40" aria-hidden="true" />

              <a
                href="mailto:info@asrepafrica.org"
                className="text-sand text-xs flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                info@asrepafrica.org
              </a>
            </div>

            {/* Right: social icons + donate */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1Cpm3uk3uY/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-sand hover:text-gold transition-colors opacity-75 hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506
                       1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63
                       1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="https://x.com/asrepafrica"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-sand hover:text-gold transition-colors opacity-75 hover:opacity-100"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <Link
                href="/get-involved/donate"
                aria-label="Donate to ASREP Africa"
                className="ml-1 px-3 py-1 border border-gold text-gold text-xs font-semibold rounded
                  hover:bg-gold hover:text-forest transition-colors whitespace-nowrap"
              >
                Donate →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Strip 2: Main Nav ────────────────────────────────────────────── */}
        <nav role="navigation" aria-label="Main navigation" className="bg-forest">
          <div className="container-asrep">
            <div className="flex items-center justify-between h-18 md:h-20">

              {/* Logo */}
              <Link
                href="/"
                className="flex items-center shrink-0 py-2"
                aria-label="ASREP Africa — Home"
              >
                <div className="relative h-12 md:h-14 w-auto">
                  <Image
                    src="/logos/asrep-logo.png"
                    alt="ASREP Africa — ASAL Research & Resilience Programme"
                    height={56}
                    width={160}
                    priority
                    className="object-contain h-12 md:h-14 w-auto bg-white rounded-lg px-2 py-1"
                  />
                </div>
              </Link>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
                {navItems.map((item) => (
                  <div
                    key={item.href + item.label}
                    className="relative"
                    onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                    onMouseLeave={() => item.children && handleMouseLeave()}
                  >
                    {item.children ? (
                      <>
                        <button
                          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90
                            hover:text-white transition-colors rounded-md hover:bg-white/10
                            focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none
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
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
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

                {/* Donate Now CTA */}
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

              {/* Mobile: Donate + Hamburger */}
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

      </header>

      {/* Spacer: mobile = main nav (72px); desktop = topbar (~36px) + main nav (80px) */}
      <div className="h-18 md:h-[116px]" aria-hidden="true" />

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
