import { NextRequest, NextResponse } from "next/server";

/**
 * Pesapal Donation API Route
 *
 * Flow:
 * 1. Authenticate with Pesapal OAuth to get access token
 * 2. Register IPN URL (idempotent — only needs doing once)
 * 3. Submit order to Pesapal and receive redirect URL
 * 4. Return redirect URL to client → client redirects to Pesapal checkout
 */

const PESAPAL_API = process.env.PESAPAL_ENV === "production"
  ? "https://pay.pesapal.com/v3"
  : "https://cybqa.pesapal.com/pesapalv3";

async function getPesapalToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_API}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  if (!res.ok) throw new Error("Pesapal authentication failed");
  const data = await res.json();
  if (!data.token) throw new Error("No token received from Pesapal");
  return data.token;
}

async function registerIpn(token: string): Promise<string> {
  const ipnUrl = process.env.NEXT_PUBLIC_PESAPAL_IPN_URL ??
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/donate/pesapal/ipn`;

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
  });

  const data = await res.json();
  return data.ipn_id ?? "";
}

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, programme, donorName, donorEmail, donorPhone } = await req.json();

    // Validation
    if (!amount || amount < 100) {
      return NextResponse.json({ message: "Minimum donation is KES 100." }, { status: 400 });
    }
    if (!donorName?.trim() || !donorEmail?.trim()) {
      return NextResponse.json({ message: "Donor name and email are required." }, { status: 400 });
    }

    // Auth
    const token = await getPesapalToken();

    // Register IPN (idempotent)
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

    return NextResponse.json({ redirect_url: orderData.redirect_url }, { status: 200 });
  } catch (err) {
    console.error("Pesapal donation error:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Payment initiation failed." },
      { status: 500 }
    );
  }
}
