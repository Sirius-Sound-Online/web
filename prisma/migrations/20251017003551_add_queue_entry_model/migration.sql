-- AlterTable
ALTER TABLE "User" ADD COLUMN "queueNumber" INTEGER;

-- CreateTable
CREATE TABLE "QueueEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "queueNumber" INTEGER NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "stripeIntentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending_payment',
    "depositAmount" INTEGER NOT NULL DEFAULT 10000,
    "remainingAmount" INTEGER NOT NULL DEFAULT 45000,
    "telegramUsername" TEXT,
    "telegramInviteSent" BOOLEAN NOT NULL DEFAULT false,
    "pickupConfig" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "contactedAt" DATETIME,
    "confirmedAt" DATETIME,
    "shippedAt" DATETIME,
    CONSTRAINT "QueueEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "QueueEntry_queueNumber_key" ON "QueueEntry"("queueNumber");

-- CreateIndex
CREATE UNIQUE INDEX "QueueEntry_stripeSessionId_key" ON "QueueEntry"("stripeSessionId");
