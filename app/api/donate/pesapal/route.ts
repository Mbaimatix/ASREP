import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/csrf";

/**
 * Pesapal Donation API Route
 *
 * Flow:
 * 1. Authenticate with Pesapal OAuth to get a fresh access token per request
 * 2. Register IPN URL (idempotent — same URL returns same IPN ID)
 * 3. Submit order to Pesapal and receive redirect URL
 * 4. Validate redirect URL origin
 * 5. Return redirect URL to client → client redirects to Pesapal checkout
 *
 * Token caching at module level was removed: serverless environments (Vercel)
 * spawn isolated function instances that don't share module state, so cached
 * tokens were silently expiring or being refetched anyway. Stateless auth per
 * request is the correct model here.
 */

const PESAPAL_API = process.env.PESAPAL_ENV === "production"
  ? "https://pay.pesapal.com/v3"
  : "https://cybqa.pesapal.com/pesapalv3";

if (process.env.NODE_ENV === "production" && !process.env.PESAPAL_IPN_SECRET) {
  console.warn("[pesapal] PESAPAL_IPN_SECRET is not set — IPN endpoint is unauthenticated");
}

// Allowed Pesapal redirect URL prefixes
const ALLOWED_REDIRECT_PREFIXES = [
  "https://pay.pesapal.com",
  "https://cybqa.pesapal.com",
];

async function getPesapalToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_API}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
    // Disable Next.js fetch caching — auth tokens must never be stale
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Pesapal authentication failed");
  const data = await res.json();
  if (!data.token) throw new Error("No token received from Pesapal");
  return data.token as string;
}

async function registerIpn(token: string): Promise<string> {
  // IPN URL includes a secret token to authenticate Pesapal callbacks
  const secret = process.env.PESAPAL_IPN_SECRET ?? "";
  const baseIpnUrl = process.env.PESAPAL_IPN_URL ??
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/donate/pesapal/ipn`;
  const ipnUrl = secret ? `${baseIpnUrl}?token=${encodeURIComponent(secret)}` : baseIpnUrl;

  const res = await fetch(`${PESAPAL_API}/api/URLSetup/RegisterIPN`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: "GET",
    }),
    cache: "no-store",
  });

  const data = await res.json();
  return (data.ipn_id as string | undefined) ?? "";
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 8_192) {
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
    const { amount, currency, programme, donorName, donorEmail, donorPhone } = await req.json();

    // Validation
    if (!amount || amount < 100) {
      return NextResponse.json({ message: "Minimum donation is KES 100." }, { status: 400 });
    }
    if (!donorName?.trim() || !donorEmail?.trim()) {
      return NextResponse.json({ message: "Donor name and email are required." }, { status: 400 });
    }

    // Auth (cached)
    const token = await getPesapalToken();

    // Register IPN (cached after first call)
    const ipnId = await registerIpn(token);

    // Generate unique order reference
    const orderRef = `ASREP-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    // Prepare callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/get-involved/donate/thank-you`;

    // Submit order
    const orderRes = await fetch(`${PESAPAL_API}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: orderRef,
        currency: currency ?? "KES",
        amount: Number(amount),
        description: `ASREP Africa Donation — ${programme ?? "General"}`,
        callback_url: callbackUrl,
        notification_id: ipnId,
        billing_address: {
          email_address: donorEmail.trim(),
          phone_number: donorPhone?.trim() ?? "",
          country_code: "KE",
          first_name: donorName.trim().split(" ")[0],
          last_name: donorName.trim().split(" ").slice(1).join(" ") || " ",
        },
      }),
    });

    if (!orderRes.ok) {
      const errData = await orderRes.json();
      console.error("Pesapal order error:", errData);
      throw new Error("Failed to initiate payment.");
    }

    const orderData = await orderRes.json();

    if (!orderData.redirect_url) {
      throw new Error("No payment redirect URL received.");
    }

    // Validate redirect URL comes from a known Pesapal domain
    const isValidRedirect = ALLOWED_REDIRECT_PREFIXES.some((prefix) =>
      (orderData.redirect_url as string).startsWith(prefix)
    );
    if (!isValidRedirect) {
      console.error("Unexpected Pesapal redirect URL:", orderData.redirect_url);
      return NextResponse.json(
        { message: "Invalid payment redirect URL received." },
        { status: 502 }
      );
    }

    return NextResponse.json({ redirect_url: orderData.redirect_url }, { status: 200 });
  } catch (err) {
    console.error("Pesapal donation error:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Payment initiation failed." },
      { status: 500 }
    );
  }
}
