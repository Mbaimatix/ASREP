import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHmac, timingSafeEqual } from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encoded = searchParams.get("e");
  const sig = searchParams.get("s");

  if (!encoded || !sig) {
    return NextResponse.redirect(
      new URL("/unsubscribe?error=invalid", req.url)
    );
  }

  // Verify HMAC signature — prevents unsubscribing arbitrary third-party emails
  const secret = process.env.NEXTAUTH_SECRET ?? "fallback-secret";
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
