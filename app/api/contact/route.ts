import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/csrf";

// Field length limits (Vuln 4)
const LIMITS = {
  fullName: 100,
  email: 254,
  organisation: 200,
  subject: 200,
  message: 5000,
};

/** Escape user input before interpolating it into an HTML email template. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

// Hard limit: 32 KB per contact form submission
export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 32_768) {
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
    const { fullName, email, organisation, subject, message, honeypot, renderTs } = await req.json();

    // Honeypot + minimum-fill-time: silently accept so bots learn nothing
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    if (typeof renderTs === "number" && Date.now() - renderTs < 3000) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Presence validation
    if (!fullName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Full name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Vuln 4 — length limits
    if (fullName.trim().length > LIMITS.fullName) {
      return NextResponse.json({ message: `Full name must be ${LIMITS.fullName} characters or fewer.` }, { status: 400 });
    }
    if (email.trim().length > LIMITS.email) {
      return NextResponse.json({ message: `Email must be ${LIMITS.email} characters or fewer.` }, { status: 400 });
    }
    if (organisation && organisation.trim().length > LIMITS.organisation) {
      return NextResponse.json({ message: `Organisation must be ${LIMITS.organisation} characters or fewer.` }, { status: 400 });
    }
    if (subject.trim().length > LIMITS.subject) {
      return NextResponse.json({ message: `Subject must be ${LIMITS.subject} characters or fewer.` }, { status: 400 });
    }
    if (message.trim().length > LIMITS.message) {
      return NextResponse.json({ message: `Message must be ${LIMITS.message} characters or fewer.` }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    // Log to database
    try {
      await prisma.contactLog.create({
        data: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          organisation: organisation?.trim() ?? null,
          subject: subject.trim(),
          message: message.trim(),
        },
      });
    } catch (dbErr) {
      console.error("DB log failed:", dbErr);
      // Non-fatal — continue to send email
    }

    // Escape every user-provided value before interpolating into HTML templates.
    const safe = {
      fullName: escapeHtml(fullName.trim()),
      firstName: escapeHtml(fullName.trim().split(" ")[0]),
      email: escapeHtml(email.trim()),
      organisation: organisation ? escapeHtml(organisation.trim()) : "",
      subject: escapeHtml(subject.trim()),
      message: escapeHtml(message.trim()),
    };

    // Send email notification to ASREP team
    await transporter.sendMail({
      from: `"ASREP Africa Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO ?? "asrepafrica@gmail.com",
      replyTo: email.trim(),
      subject: `[ASREP Website] ${subject} — from ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A3A2A; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C9A84C; margin: 0; font-size: 18px;">New Contact Form Submission</h2>
          </div>
          <div style="background: #FAF6F0; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8d5b7;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td><td style="padding: 8px 0; color: #1C1C1C;">${safe.fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 8px 0; color: #1C1C1C;"><a href="mailto:${safe.email}" style="color: #1A3A2A;">${safe.email}</a></td></tr>
              ${organisation ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Organisation</td><td style="padding: 8px 0; color: #1C1C1C;">${safe.organisation}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td><td style="padding: 8px 0; color: #1C1C1C;">${safe.subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e8d5b7; margin: 16px 0;" />
            <p style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
            <p style="color: #1C1C1C; line-height: 1.6; white-space: pre-wrap;">${safe.message}</p>
          </div>
          <p style="color: #6B7280; font-size: 11px; margin-top: 12px; text-align: center;">
            Sent from the ASREP Africa website contact form — asrepafrica.org
          </p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"ASREP Africa" <${process.env.EMAIL_FROM}>`,
      to: email.trim(),
      subject: "We received your message — ASREP Africa",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A3A2A; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #C9A84C; margin: 0;">Thank you, ${safe.firstName}</h2>
          </div>
          <div style="background: #FAF6F0; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8d5b7;">
            <p>We've received your message regarding <strong>${safe.subject}</strong> and will respond within <strong>3–5 working days</strong>.</p>
            <p style="color: #6B7280; font-size: 14px;">If your matter is urgent, please call us at +254 733 687 149.</p>
          </div>
          <p style="color: #6B7280; font-size: 11px; margin-top: 12px; text-align: center;">
            ASREP Africa — ASAL Research & Resilience Programme · Isiolo County, Kenya
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { message: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
