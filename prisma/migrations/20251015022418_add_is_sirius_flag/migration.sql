-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PickupSample" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "guitar" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "audioFile" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "isSirius" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PickupSample" ("active", "audioFile", "createdAt", "description", "guitar", "id", "name", "order", "position") SELECT "active", "audioFile", "createdAt", "description", "guitar", "id", "name", "order", "position" FROM "PickupSample";
DROP TABLE "PickupSample";
ALTER TABLE "new_PickupSample" RENAME TO "PickupSample";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
