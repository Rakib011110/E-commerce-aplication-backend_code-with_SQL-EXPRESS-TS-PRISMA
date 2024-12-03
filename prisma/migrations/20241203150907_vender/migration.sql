/*
  Warnings:

  - You are about to drop the `_ShopFollowers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[vendorId]` on the table `shops` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ShopFollowers" DROP CONSTRAINT "_ShopFollowers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopFollowers" DROP CONSTRAINT "_ShopFollowers_B_fkey";

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "followersid" TEXT;

-- DropTable
DROP TABLE "_ShopFollowers";

-- CreateIndex
CREATE UNIQUE INDEX "shops_vendorId_key" ON "shops"("vendorId");

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_followersid_fkey" FOREIGN KEY ("followersid") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
