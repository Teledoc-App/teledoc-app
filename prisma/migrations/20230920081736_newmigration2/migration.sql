/*
  Warnings:

  - Added the required column `username` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Specialist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Specialist" ALTER COLUMN "title" SET NOT NULL;
