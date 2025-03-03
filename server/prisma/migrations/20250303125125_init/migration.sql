-- CreateEnum
CREATE TYPE "size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "size" "size" NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
