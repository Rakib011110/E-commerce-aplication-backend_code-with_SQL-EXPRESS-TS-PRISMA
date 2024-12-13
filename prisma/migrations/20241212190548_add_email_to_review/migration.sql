-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "email" TEXT,
ALTER COLUMN "rating" DROP NOT NULL;
