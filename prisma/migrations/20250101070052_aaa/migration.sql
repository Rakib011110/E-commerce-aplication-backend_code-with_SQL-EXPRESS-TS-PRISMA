-- AlterTable
ALTER TABLE "products" ADD COLUMN     "flashSaleEndAt" TIMESTAMP(3),
ADD COLUMN     "isFlashSale" BOOLEAN NOT NULL DEFAULT false;
