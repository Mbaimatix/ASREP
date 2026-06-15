-- CreateTable
CREATE TABLE "Donation" (
    "id"                     TEXT NOT NULL,
    "orderTrackingId"        TEXT NOT NULL,
    "orderMerchantReference" TEXT NOT NULL,
    "status"                 TEXT NOT NULL,
    "amount"                 DOUBLE PRECISION NOT NULL,
    "currency"               TEXT NOT NULL DEFAULT 'KES',
    "paymentMethod"          TEXT NOT NULL DEFAULT '',
    "donorName"              TEXT NOT NULL DEFAULT '',
    "donorEmail"             TEXT NOT NULL DEFAULT '',
    "programme"              TEXT NOT NULL DEFAULT 'General',
    "createdAt"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"              TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_orderTrackingId_key" ON "Donation"("orderTrackingId");

-- CreateIndex
CREATE INDEX "Donation_createdAt_idx" ON "Donation"("createdAt");

-- CreateIndex
CREATE INDEX "Donation_status_idx" ON "Donation"("status");
