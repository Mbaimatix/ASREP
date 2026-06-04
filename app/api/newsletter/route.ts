import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/csrf";
import { createHmac } from "crypto";

/**
 * Builds a tamper-proof unsubscribe URL.
 * The email is base64url-encoded; the signature prevents arbitrary unsubscription
 * of third-party email addresses without the NEXTAUTH_SECRET.
 */
function buildUnsubscribeUrl(email: string): string {
  const secret = process.env.NEXTAUTH_SECRET ?? "fallback-secret";
  const encoded = Buffer.from(email).toString("base64url");
  const sig = createHmac("sha256", secret).update(encoded).digest("hex");
  return `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?e=${encoded}&s=${sig}`;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 4_096) {
    return NextResponse.json({ message: "Request too large." }, { status: 413 });
  }

  // CSRF origin check
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  // Rate limiting (5 requests per IP per 10 minutes)
  const ip = getClientIp(req);
  const { allowed, retryAfterSeconds } = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      }
    );
  }

  try {
    const { email } = await req.json();

    if (!email?.trim()) {
      return NextResponse.json({ message: "Email address is required." }, { status: 400 });
    }

    // Vuln 4 — length limit
    if (email.trim().length > 254) {
      return NextResponse.json({ message: "Email must be 254 characters or fewer." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    const normalised = email.trim().toLowerCase();

    // Upsert subscriber (prevents duplicate error)
    await prisma.newsletterSubscriber.upsert({
      where: { email: normalised },
      update: { isActive: true },
      create: { email: normalised },
    });

    // Send welcome email
    try {
      await transporter.sendMail({
        from: `"ASREP Africa" <${process.env.EMAIL_FROM}>`,
        to: normalised,
        subject: "Welcome to ASREP Africa — you're subscribed!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1A3A2A; padding: 32px 24px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="color: #C9A84C; margin: 0 0 8px; font-size: 22px;">You're in.</h2>
              <p style="color: #FFFFFF; margin: 0; font-size: 14px;">Welcome to ASREP Africa's community</p>
            </div>
            <div style="background: #FAF6F0; padding: 28px 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8d5b7;">
              <p style="color: #1C1C1C;">Thank you for subscribing to updates from ASREP Africa. You'll receive occasional field updates, research releases, and impact stories from Kenya's ASALs.</p>
              <p style="color: #6B7280; font-size: 14px; font-style: italic;">"Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience."</p>
            </div>
            <p style="color: #6B7280; font-size: 11px; margin-top: 12px; text-align: center;">
              ASREP Africa · Isiolo County, Kenya · asrepafrica@gmail.com<br />
              <a href="${buildUnsubscribeUrl(normalised)}" style="color: #6B7280;">Unsubscribe</a>
            </p>
          </div>
        `,
      });
    } catch {
      // Non-fatal — subscriber is saved, email just didn't send
      console.warn("Newsletter welcome email failed");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { message: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
