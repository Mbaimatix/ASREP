import { NextRequest, NextResponse } from "next/server";

/**
 * Pesapal IPN (Instant Payment Notification) Handler
 *
 * Pesapal calls this endpoint via GET after a transaction completes or fails.
 * We acknowledge receipt immediately and log the notification.
 *
 * TODO: Implement full payment verification by querying the Pesapal
 * transaction status API (/api/Transactions/GetTransactionStatus) with the
 * OrderTrackingId, then update the donation record in your database and send
 * a confirmation email to the donor.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");
  const orderNotificationType = searchParams.get("OrderNotificationType");

  console.log("Pesapal IPN received:", {
    orderTrackingId,
    orderMerchantReference,
    orderNotificationType,
  });

  // Pesapal requires a 200 response to acknowledge receipt
  return NextResponse.json(
    { status: "200", message: "Notification received." },
    { status: 200 }
  );
}
