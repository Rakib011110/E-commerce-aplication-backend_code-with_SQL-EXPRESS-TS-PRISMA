/*
  Warnings:

  - You are about to drop the column `followersid` on the `shops` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "shops" DROP CONSTRAINT "shops_followersid_fkey";

-- AlterTable
ALTER TABLE "shops" DROP COLUMN "followersid";

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "description" TEXT,
ADD COLUMN     "shopLogo" TEXT,
ADD COLUMN     "shopName" TEXT;

-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShopFollowers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ShopFollowers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ShopFollowers_B_index" ON "_ShopFollowers"("B");

-- AddForeignKey
ALTER TABLE "Blacklist" ADD CONSTRAINT "Blacklist_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopFollowers" ADD CONSTRAINT "_ShopFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopFollowers" ADD CONSTRAINT "_ShopFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
