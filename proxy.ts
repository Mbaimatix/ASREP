import { auth } from "./lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ASREP Africa — Edge Middleware (RBAC Guard)
 *
 * Intercepts all requests to /admin/*
 * Redirects unauthenticated users to the login page.
 * Enforces role-based access within the admin area.
 */
export default auth((req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  // Pass Decap CMS static files through — GitHub OAuth handles CMS access
  if (pathname === "/admin/index.html" || pathname === "/admin/config.yml") {
    return NextResponse.next();
  }

  // ─── Unauthenticated — redirect to login ────────────────────────────────
  if (!session) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ─── User management — SUPER_ADMIN only ─────────────────────────────────
  if (pathname.startsWith("/admin/user-management") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(
      new URL("/admin/dashboard?error=unauthorized", req.url)
    );
  }

  // ─── Publishing actions — SUPER_ADMIN + EDITOR only ─────────────────────
  if (
    pathname.startsWith("/admin/publish") &&
    !["SUPER_ADMIN", "EDITOR"].includes(role ?? "")
  ) {
    return NextResponse.redirect(
      new URL("/admin/dashboard?error=unauthorized", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
