-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'DOCTOR', 'RECEPTIONIST', 'NURSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DOCTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receptionist" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3),
    "contactInfo" TEXT NOT NULL,
    "workingHours" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'RECEPTIONIST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receptionist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nurse" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3),
    "workingHours" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'NURSE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nurse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT,
    "nurseId" TEXT,
    "receptionistId" TEXT,
    "rating" INTEGER,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Receptionist_email_key" ON "Receptionist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_email_key" ON "Nurse"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_doctorId_key" ON "Rating"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_nurseId_key" ON "Rating"("nurseId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_receptionistId_key" ON "Rating"("receptionistId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_receptionistId_fkey" FOREIGN KEY ("receptionistId") REFERENCES "Receptionist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
