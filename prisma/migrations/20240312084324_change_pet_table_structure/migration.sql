/*
  Warnings:

  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dewormed` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `microchip` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccinated` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "dewormed" BOOLEAN NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "microchip" BOOLEAN NOT NULL,
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vaccinated" BOOLEAN NOT NULL;
