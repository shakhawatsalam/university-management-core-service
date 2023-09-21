import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemister/academicSemester.routes';
import { buildingRoutes } from '../modules/building/building.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { offeredCourseRoutes } from '../modules/offredCourse/offredCourse.route';
import { OfferedCourseClassScheduleRoutes } from '../modules/offredCourseClassSchedule/offredCourseClassSchedule.routes';
import { offeredCourseSectionRoutes } from '../modules/offredCourseSection/offredCourseSection.routes';
import { roomRoutes } from '../modules/room/room.routes';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { studentRoutes } from '../modules/student/student.routes';
import { studentEnrolledCourseRoutes } from '../modules/studentEnrolledCourse/studentEnrolledCourse.routes';
import { StudentEnrolledCourseMarksRoutes } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.routes';
import { studentSemesterPaymentRoutes } from '../modules/studentSemesterPayment/studentSemesterPayment.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoutes,
  },
  {
    path: '/academic-departments',
    routes: AcademicDepartmentRouter,
  },
  {
    path: '/academic-faculties',
    routes: academicFacultyRoutes,
  },
  {
    path: '/faculties',
    routes: facultyRoutes,
  },
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/buildings',
    routes: buildingRoutes,
  },
  {
    path: '/rooms',
    routes: roomRoutes,
  },
  {
    path: '/courses',
    routes: courseRoutes,
  },
  {
    path: '/semester-registrations',
    routes: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    routes: offeredCourseRoutes,
  },
  {
    path: '/offred-course-sections',
    routes: offeredCourseSectionRoutes,
  },
  {
    path: '/offred-course-class-schedule',
    routes: OfferedCourseClassScheduleRoutes,
  },
  {
    path: '/student-enrolled-courses',
    routes: studentEnrolledCourseRoutes,
  },
  {
    path: '/student-enrolled-course-marks',
    routes: StudentEnrolledCourseMarksRoutes,
  },
  {
    path: '/student-semester-payments',
    routes: studentSemesterPaymentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
