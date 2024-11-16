/*
  Warnings:

  - You are about to drop the column `measuareUnit` on the `TaskOption` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "goalType" TEXT NOT NULL,
    "defaultDays" INTEGER NOT NULL DEFAULT 7,
    "measureUnit" TEXT,
    "defaultGoal" REAL,
    "description" TEXT,
    "category" TEXT
);
INSERT INTO "new_TaskOption" ("category", "defaultDays", "defaultGoal", "description", "goalType", "id", "name") SELECT "category", "defaultDays", "defaultGoal", "description", "goalType", "id", "name" FROM "TaskOption";
DROP TABLE "TaskOption";
ALTER TABLE "new_TaskOption" RENAME TO "TaskOption";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
