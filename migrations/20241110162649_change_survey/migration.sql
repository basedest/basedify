/*
  Warnings:

  - You are about to drop the column `activityLevel` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `currentHabits` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `habitsToAcquire` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `habitsToRemove` on the `Survey` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Survey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Survey" ("id", "userId") SELECT "id", "userId" FROM "Survey";
DROP TABLE "Survey";
ALTER TABLE "new_Survey" RENAME TO "Survey";
CREATE UNIQUE INDEX "Survey_userId_key" ON "Survey"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
