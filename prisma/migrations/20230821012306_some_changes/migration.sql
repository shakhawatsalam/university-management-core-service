/*
  Warnings:

  - You are about to drop the column `contactNO` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `middlename` on the `students` table. All the data in the column will be lost.
  - Added the required column `contactNo` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "contactNO",
DROP COLUMN "middlename",
ADD COLUMN     "contactNo" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL;
