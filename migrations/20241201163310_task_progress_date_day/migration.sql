/*
  Warnings:

  - You are about to drop the column `date` on the `TaskProgress` table. All the data in the column will be lost.
  - Added the required column `day` to the `TaskProgress` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Program" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalDays" INTEGER NOT NULL DEFAULT 70,
    "userId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Program_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Program" ("id", "isActive", "isCompleted", "startDate", "userId") SELECT "id", "isActive", "isCompleted", "startDate", "userId" FROM "Program";
DROP TABLE "Program";
ALTER TABLE "new_Program" RENAME TO "Program";
CREATE TABLE "new_TaskProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "value" REAL,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "TaskProgress_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TaskProgress" ("id", "status", "taskId", "value") SELECT "id", "status", "taskId", "value" FROM "TaskProgress";
DROP TABLE "TaskProgress";
ALTER TABLE "new_TaskProgress" RENAME TO "TaskProgress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
