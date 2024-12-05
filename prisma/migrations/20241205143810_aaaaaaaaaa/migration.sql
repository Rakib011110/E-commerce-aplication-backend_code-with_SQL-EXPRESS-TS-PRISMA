/*
  Warnings:

  - You are about to drop the `Blacklist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopFollow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blacklist" DROP CONSTRAINT "Blacklist_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "ShopFollow" DROP CONSTRAINT "ShopFollow_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ShopFollow" DROP CONSTRAINT "ShopFollow_userId_fkey";

-- DropTable
DROP TABLE "Blacklist";

-- DropTable
DROP TABLE "ShopFollow";
