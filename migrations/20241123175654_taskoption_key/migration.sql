/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `TaskOption` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TaskOption" ADD COLUMN "key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TaskOption_key_key" ON "TaskOption"("key");
