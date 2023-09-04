/*
  Warnings:

  - You are about to drop the column `offredCourseSectionId` on the `offered_course_class_schedules` table. All the data in the column will be lost.
  - You are about to drop the `offred_course_sections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `offeredCourseSectionId` to the `offered_course_class_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offered_course_class_schedules" DROP CONSTRAINT "offered_course_class_schedules_offredCourseSectionId_fkey";

-- DropForeignKey
ALTER TABLE "offred_course_sections" DROP CONSTRAINT "offred_course_sections_offredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "offred_course_sections" DROP CONSTRAINT "offred_course_sections_semesterRegistrationId_fkey";

-- AlterTable
ALTER TABLE "offered_course_class_schedules" DROP COLUMN "offredCourseSectionId",
ADD COLUMN     "offeredCourseSectionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "offred_course_sections";

-- CreateTable
CREATE TABLE "offered_course_sections" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEnrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offered_course_sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_course_sections" ADD CONSTRAINT "offered_course_sections_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offerd_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_sections" ADD CONSTRAINT "offered_course_sections_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedules" ADD CONSTRAINT "offered_course_class_schedules_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
