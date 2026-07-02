import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (!session) redirect("/admin/login");

  const role = session.user.role;
  const name = session.user.name ?? session.user.email;

  // Fetch basic counts
  let contactCount = 0;
  let newsletterCount = 0;
  try {
    [contactCount, newsletterCount] = await Promise.all([
      prisma.contactLog.count({ where: { isRead: false } }),
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    ]);
  } catch { /* DB may not be connected in dev */ }

  const quickLinks = [
    { label: "Unread Messages", href: "/admin/contacts", icon: "📬", desc: `${contactCount} unread contact form submissions.`, access: ["SUPER_ADMIN", "EDITOR"] },
    { label: "Newsletter Subscribers", href: "/admin/newsletter", icon: "📧", desc: `${newsletterCount} active subscribers.`, access: ["SUPER_ADMIN", "EDITOR"] },
    { label: "User Management", href: "/admin/user-management", icon: "👥", desc: "Add, edit, or deactivate staff accounts.", access: ["SUPER_ADMIN"] },
  ].filter((link) => link.access.includes(role));

  return (
    <main className="min-h-screen bg-cream">
      {/* Header bar */}
      <div className="bg-forest text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest">ASREP Africa</p>
            <h1 className="font-display font-bold text-xl">Staff Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white text-sm font-medium">{name}</p>
              <p className="text-white/50 text-xs">{role.replace(/_/g, " ")}</p>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="px-4 py-2 border border-white/30 hover:border-white text-white text-xs font-medium rounded-lg transition-colors">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Error banner */}
        {params.error === "unauthorized" && (
          <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ You don&apos;t have permission to access that page.
          </div>
        )}

        {/* Welcome */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-earth text-2xl mb-1">
            Welcome back{name ? `, ${name.split(" ")[0]}` : ""}
          </h2>
          <p className="text-charcoal/55 text-sm">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="group flex items-start gap-5 p-7 bg-white rounded-2xl border border-charcoal/8
                shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <span className="text-3xl shrink-0" aria-hidden="true">{link.icon}</span>
              <div>
                <h3 className="font-semibold text-charcoal group-hover:text-forest transition-colors mb-1">
                  {link.label}
                </h3>
                <p className="text-charcoal/55 text-sm">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Website link */}
        <div className="bg-forest/5 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-charcoal text-sm">Public Website</p>
            <p className="text-charcoal/50 text-xs">asrepafrica.org</p>
          </div>
          <Link href="/" target="_blank" className="flex items-center gap-1.5 text-forest text-sm font-semibold hover:text-sage transition-colors">
            Visit Site →
          </Link>
        </div>
      </div>
    </main>
  );
}
