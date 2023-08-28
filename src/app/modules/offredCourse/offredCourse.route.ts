import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { offredCourseController } from './offredCourse.controller';
import { offredCourseValidation } from './offredCourse.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(offredCourseValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offredCourseController.insertIntoDB
);

export const offredCourseRoutes = router;
