import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/shared/BackToTop";
import AIChatWidget from "@/components/shared/AIChatWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
