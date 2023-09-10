import express from 'express';
import { StudentEnrolledCourseMarksController } from './studentEnrolledCourseMark.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarksController.getAllFromDB
);
router.patch(
  '/update-marks',
  StudentEnrolledCourseMarksController.updateStudentMark
);
router.patch(
  '/update-final-marks',
  StudentEnrolledCourseMarksController.updateFinalMarks
);

export const StudentEnrolledCourseMarksRoutes = router;
