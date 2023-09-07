import express from 'express';
import { StudentEnrolledCourseMarksController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/update-marks',
  StudentEnrolledCourseMarksController.updateStudentMark
);

export const StudentEnrolledCourseMarksRoutes = router;
