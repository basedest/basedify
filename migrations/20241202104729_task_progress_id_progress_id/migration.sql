/*
  Warnings:

  - The primary key for the `TaskProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TaskProgress` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskProgress" (
    "day" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "value" REAL,
    "taskId" INTEGER NOT NULL,

    PRIMARY KEY ("taskId", "day"),
    CONSTRAINT "TaskProgress_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TaskProgress" ("day", "status", "taskId", "value") SELECT "day", "status", "taskId", "value" FROM "TaskProgress";
DROP TABLE "TaskProgress";
ALTER TABLE "new_TaskProgress" RENAME TO "TaskProgress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
