import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, organisation, subject, message } = await req.json();

    // Validation
    if (!fullName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Full name, email, subject, and message are required." },
        { status: 400 }
      );
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
              <tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td><td style="padding: 8px 0; color: #1C1C1C;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 8px 0; color: #1C1C1C;"><a href="mailto:${email}" style="color: #1A3A2A;">${email}</a></td></tr>
              ${organisation ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Organisation</td><td style="padding: 8px 0; color: #1C1C1C;">${organisation}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td><td style="padding: 8px 0; color: #1C1C1C;">${subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e8d5b7; margin: 16px 0;" />
            <p style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">Message</p>
            <p style="color: #1C1C1C; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
            <h2 style="color: #C9A84C; margin: 0;">Thank you, ${fullName.split(" ")[0]}</h2>
          </div>
          <div style="background: #FAF6F0; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8d5b7;">
            <p>We've received your message regarding <strong>${subject}</strong> and will respond within <strong>3–5 working days</strong>.</p>
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
