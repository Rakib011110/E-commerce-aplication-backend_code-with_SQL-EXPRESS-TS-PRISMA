/*
  Warnings:

  - You are about to drop the `_ShopFollowers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ShopFollowers" DROP CONSTRAINT "_ShopFollowers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopFollowers" DROP CONSTRAINT "_ShopFollowers_B_fkey";

-- DropTable
DROP TABLE "_ShopFollowers";

-- CreateTable
CREATE TABLE "shop_followers" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shop_followers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shop_followers_customerId_shopId_key" ON "shop_followers"("customerId", "shopId");

-- AddForeignKey
ALTER TABLE "shop_followers" ADD CONSTRAINT "shop_followers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_followers" ADD CONSTRAINT "shop_followers_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
