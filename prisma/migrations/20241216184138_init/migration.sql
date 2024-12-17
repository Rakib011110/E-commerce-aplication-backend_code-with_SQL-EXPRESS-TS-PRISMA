/*
  Warnings:

  - You are about to drop the column `customerId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `userId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_customerId_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "customerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
