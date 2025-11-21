-- CreateEnum
CREATE TYPE "ApplicationFit" AS ENUM ('YES', 'NO');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "mainChallenge" TEXT NOT NULL,
    "reactionToBlock" TEXT NOT NULL,
    "controlLevel" INTEGER NOT NULL,
    "finalFit" "ApplicationFit" NOT NULL,
    "notJoinReason" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
