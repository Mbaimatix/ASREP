import type { Metadata } from "next";

export const metadata: Metadata = {
  // `absolute` opts out of the root "%s | ASREP Africa" template,
  // which would otherwise double the suffix on admin pages.
  title: { absolute: "Admin — ASREP Africa" },
  robots: { index: false, follow: false },
};

/**
 * Admin section layout — deliberately minimal.
 * No public Navbar or Footer here; only the staff portal chrome.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      {children}
    </div>
  );
}
