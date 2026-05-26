import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Public-facing site layout — wraps every page under (site)/ with
 * the sticky Navbar and full Footer.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
