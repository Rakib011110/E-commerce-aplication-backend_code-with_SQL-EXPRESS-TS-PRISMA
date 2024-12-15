/*
  Warnings:

  - You are about to drop the column `vendorId` on the `shops` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `shops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `shops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shops" DROP CONSTRAINT "shops_vendorId_fkey";

-- DropIndex
DROP INDEX "shops_vendorId_key";

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "shops" DROP COLUMN "vendorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shops_userId_key" ON "shops"("userId");

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_userId_fkey" FOREIGN KEY ("userId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
