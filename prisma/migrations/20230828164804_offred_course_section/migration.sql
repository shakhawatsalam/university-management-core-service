-- CreateTable
CREATE TABLE "offred_course_sections" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEnrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offredCourseId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offred_course_sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offred_course_sections" ADD CONSTRAINT "offred_course_sections_offredCourseId_fkey" FOREIGN KEY ("offredCourseId") REFERENCES "offerd_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offred_course_sections" ADD CONSTRAINT "offred_course_sections_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
