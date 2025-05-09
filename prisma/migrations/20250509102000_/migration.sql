/*
  Warnings:

  - A unique constraint covering the columns `[tgUserName]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_tgUserName_key" ON "Restaurant"("tgUserName");
