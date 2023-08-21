/*
  Warnings:

  - You are about to drop the column `bloodGorup` on the `students` table. All the data in the column will be lost.
  - Added the required column `bloodGroup` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "bloodGorup",
ADD COLUMN     "bloodGroup" TEXT NOT NULL;
