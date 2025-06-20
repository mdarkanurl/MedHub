/*
  Warnings:

  - You are about to drop the column `CodeExpiredTime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "CodeExpiredTime",
ADD COLUMN     "forgotPasswordCodeExpiredTime" TIMESTAMP(3),
ADD COLUMN     "verificationCodeExpiredTime" TIMESTAMP(3);
