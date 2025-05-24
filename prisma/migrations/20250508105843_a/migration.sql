/*
  Warnings:

  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sttatus" AS ENUM ('PANDING', 'PAID', 'DEBT');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Sttatus" NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "balance" DROP NOT NULL;
