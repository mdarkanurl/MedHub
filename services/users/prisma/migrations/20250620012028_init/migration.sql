-- AlterTable
ALTER TABLE "User" ADD COLUMN     "CodeExpiredTime" TIMESTAMP(3),
ADD COLUMN     "forgotPasswordCode" INTEGER;
