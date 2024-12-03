/*
  Warnings:

  - You are about to drop the column `vendorId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `shopLogo` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `shopName` on the `vendors` table. All the data in the column will be lost.
  - Added the required column `shopId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_vendorId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "vendorId",
ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "vendorId",
ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "description",
DROP COLUMN "shopLogo",
DROP COLUMN "shopName";

-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "contactNumber" TEXT,
    "address" TEXT,
    "isBlacklisted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "shops" ADD CONSTRAINT "shops_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopFollowers" ADD CONSTRAINT "_ShopFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShopFollowers" ADD CONSTRAINT "_ShopFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
