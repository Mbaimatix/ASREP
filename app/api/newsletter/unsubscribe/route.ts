import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHmac, timingSafeEqual } from "crypto";

// Fail closed: verifying an unsubscribe signature against a default secret would
// let anyone forge links. This MUST match app/api/newsletter/route.ts's signer.
// Note: NextAuth v5 (lib/auth.ts) reads AUTH_SECRET — the canonical name in v5,
// with NEXTAUTH_SECRET as its legacy alias. Keep both set to the same value.
// Resolved at call time (not module scope) so importing this route during
// `next build` can never throw.
function getNewsletterSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "";
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET/AUTH_SECRET is not set");
  }
  return secret;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encoded = searchParams.get("e");
  const sig = searchParams.get("s");

  if (!encoded || !sig) {
    return NextResponse.redirect(
      new URL("/unsubscribe?error=invalid", req.url)
    );
  }

  // Resolve the verifying secret per-request (fail closed). A misconfigured
  // deployment redirects to the generic error page rather than throwing.
  let secret: string;
  try {
    secret = getNewsletterSecret();
  } catch {
    return NextResponse.redirect(new URL("/unsubscribe?error=failed", req.url));
  }

  // Verify HMAC signature — prevents unsubscribing arbitrary third-party emails
  const expectedSig = createHmac("sha256", secret).update(encoded).digest("hex");

  const sigBuffer = Buffer.from(sig, "hex");
  const expectedBuffer = Buffer.from(expectedSig, "hex");

  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
    return NextResponse.redirect(new URL("/unsubscribe?error=invalid", req.url));
  }

  let email: string;
  try {
    email = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return NextResponse.redirect(new URL("/unsubscribe?error=invalid", req.url));
  }

  try {
    await prisma.newsletterSubscriber.updateMany({
      where: { email },
      data: { isActive: false },
    });
  } catch {
    return NextResponse.redirect(new URL("/unsubscribe?error=failed", req.url));
  }

  return NextResponse.redirect(new URL("/unsubscribe?success=true", req.url));
}
