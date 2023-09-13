import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StudentEnrolledCourseMarksController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarksController.getAllFromDB
);

router.get(
  '/my-marks',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentEnrolledCourseMarksController.getMyCourseMarks
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
