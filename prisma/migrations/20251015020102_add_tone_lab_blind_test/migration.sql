-- CreateTable
CREATE TABLE "PickupSample" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "guitar" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "audioFile" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ToneLabTest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ToneLabRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testId" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "guessedName" TEXT,
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ToneLabRating_testId_fkey" FOREIGN KEY ("testId") REFERENCES "ToneLabTest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ToneLabRating_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "PickupSample" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ToneLabTest_sessionId_key" ON "ToneLabTest"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ToneLabRating_testId_sampleId_key" ON "ToneLabRating"("testId", "sampleId");
