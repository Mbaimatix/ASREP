import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/shared/BackToTop";
import AIChatWidget from "@/components/shared/AIChatWidget";

/**
 * Public-facing site layout — wraps every page under (site)/ with
 * the sticky Navbar, full Footer, back-to-top button, and AI chat widget.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ── Top-pinned duplicate primary nav (static, always visible) ── */}
      <div className="relative z-[60] w-full">
        <Navbar />
      </div>

      {/* ── Original sticky/fixed Navbar (unchanged behaviour) ── */}
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <AIChatWidget />
    </>
  );
}
