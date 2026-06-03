import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Pesapal IPN (Instant Payment Notification) Handler
 *
 * Pesapal calls this endpoint via GET after every transaction state change.
 * We must:
 *   1. Authenticate with Pesapal to get a token
 *   2. Query the transaction status using the OrderTrackingId
 *   3. Upsert the donation record in our database
 *   4. Return HTTP 200 so Pesapal stops retrying
 *
 * Pesapal retries the IPN URL every 15 minutes if it receives anything other than 200.
 */

const PESAPAL_API =
  process.env.PESAPAL_ENV === "production"
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
  if (!res.ok) throw new Error(`IPN: Pesapal auth failed (${res.status})`);
  const data = await res.json();
  if (!data.token) throw new Error("IPN: No token in Pesapal auth response");
  return data.token as string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const orderTrackingId       = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");
  const orderNotificationType  = searchParams.get("OrderNotificationType");

  // Pesapal requires a 200 even if params are missing — just log and acknowledge
  if (!orderTrackingId || !orderMerchantReference) {
    console.warn("Pesapal IPN: missing required parameters", {
      orderTrackingId,
      orderMerchantReference,
      orderNotificationType,
    });
    return NextResponse.json(
      { orderNotificationType, orderTrackingId, orderMerchantReference, status: 200 },
      { status: 200 }
    );
  }

  try {
    // Step 1 — Authenticate
    const token = await getPesapalToken();

    // Step 2 — Query transaction status
    const statusRes = await fetch(
      `${PESAPAL_API}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const statusData = await statusRes.json() as {
      payment_status_description?: string;
      amount?: number;
      currency?: string;
      payment_method?: string;
      description?: string;
      error?: { message?: string };
    };

    const paymentStatus = statusData.payment_status_description ?? "UNKNOWN";

    console.log("Pesapal IPN verified:", {
      orderTrackingId,
      orderMerchantReference,
      status: paymentStatus,
      amount: statusData.amount,
    });

    // Step 3 — Upsert donation record
    try {
      await prisma.donation.upsert({
        where: { orderTrackingId },
        update: {
          status: paymentStatus,
          updatedAt: new Date(),
        },
        create: {
          orderTrackingId,
          orderMerchantReference,
          status: paymentStatus,
          amount: statusData.amount ?? 0,
          currency: statusData.currency ?? "KES",
          paymentMethod: statusData.payment_method ?? "",
        },
      });
    } catch (dbErr) {
      // Non-fatal: log but still return 200 so Pesapal doesn't retry indefinitely
      console.error("IPN: DB upsert failed:", dbErr);
    }

    // Step 4 — Acknowledge to Pesapal (exact format required by their API)
    return NextResponse.json(
      {
        orderNotificationType,
        orderTrackingId,
        orderMerchantReference,
        status: 200,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Pesapal IPN handler error:", err);
    // Still return 200 to avoid infinite Pesapal retry loops
    return NextResponse.json(
      { orderNotificationType, orderTrackingId, orderMerchantReference, status: 200 },
      { status: 200 }
    );
  }
}
