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
import { StudentEnrolledCourseMarksRoutes } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/buildings',
    route: buildingRoutes,
  },
  {
    path: '/rooms',
    route: roomRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offred-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/offred-course-sections',
    route: offeredCourseSectionRoutes,
  },
  {
    path: '/offred-course-class-schedule',
    route: OfferedCourseClassScheduleRoutes,
  },
  {
    path: '/student-enrolled-course-marks',
    route: StudentEnrolledCourseMarksRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
