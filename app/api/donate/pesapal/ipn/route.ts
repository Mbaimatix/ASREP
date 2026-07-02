import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Pesapal IPN (Instant Payment Notification) Handler
 *
 * Pesapal calls this endpoint via GET after every transaction state change.
 * We must:
 *   1. Verify the secret token in the query string (set during IPN registration)
 *   2. Authenticate with Pesapal to get a token
 *   3. Query the transaction status using the OrderTrackingId
 *   4. Upsert the donation record in our database
 *   5. Return HTTP 200 so Pesapal stops retrying
 *
 * Pesapal retries the IPN URL every 15 minutes if it receives anything other than 200.
 * The secret token (PESAPAL_IPN_SECRET) is appended to the IPN URL during registration
 * so only Pesapal (who received the URL) knows it.
 */

const PESAPAL_API =
  process.env.PESAPAL_ENV === "production"
    ? "https://pay.pesapal.com/v3"
    : "https://cybqa.pesapal.com/pesapalv3";

if (process.env.NODE_ENV === "production" && !process.env.PESAPAL_IPN_SECRET) {
  console.warn("[pesapal/ipn] PESAPAL_IPN_SECRET is not set — IPN endpoint is unauthenticated");
}

async function getPesapalToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_API}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`IPN: Pesapal auth failed (${res.status})`);
  const data = await res.json();
  if (!data.token) throw new Error("IPN: No token in Pesapal auth response");
  return data.token as string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Rate limit IPN endpoint to prevent flood attacks
  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(ip, 30, 60_000); // 30 req/min per IP for IPN
  if (!allowed) {
    // Still return 200 so Pesapal doesn't mark the IPN as failed
    return NextResponse.json({ status: 200 }, { status: 200 });
  }

  // Verify secret token to authenticate the caller as Pesapal
  const ipnSecret = process.env.PESAPAL_IPN_SECRET;
  if (ipnSecret) {
    const receivedToken = searchParams.get("token");
    if (receivedToken !== ipnSecret) {
      console.warn("IPN: rejected request with invalid token");
      // Return 200 to avoid Pesapal retries, but don't process the request
      return NextResponse.json({ status: 200 }, { status: 200 });
    }
  }

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

    // Step 3 — Link and update the donation record.
    // The pending row was created at initiation keyed by orderMerchantReference
    // (orderTrackingId is not known until this IPN fires). Match on that field so
    // donor details (donorName/donorEmail/programme) captured at initiation are
    // preserved rather than overwritten with blanks. Fall back to creating a row
    // if no pending record exists (e.g. the initiation write failed).
    try {
      const existing = await prisma.donation.findFirst({
        where: { orderMerchantReference },
      });

      if (existing) {
        await prisma.donation.update({
          where: { id: existing.id },
          data: {
            orderTrackingId,
            status: paymentStatus,
            amount: statusData.amount ?? existing.amount,
            currency: statusData.currency ?? existing.currency,
            paymentMethod: statusData.payment_method ?? existing.paymentMethod,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.donation.create({
          data: {
            orderTrackingId,
            orderMerchantReference,
            status: paymentStatus,
            amount: statusData.amount ?? 0,
            currency: statusData.currency ?? "KES",
            paymentMethod: statusData.payment_method ?? "",
          },
        });
      }
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
