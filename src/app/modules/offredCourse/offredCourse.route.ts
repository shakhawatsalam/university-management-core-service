import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseController } from './offredCourse.controller';
import { offeredCourseValidation } from './offredCourse.validation';

const router = express.Router();

router.get('/', offeredCourseController.getAllFromDB);
router.get('/:id', offeredCourseController.getByIdFromDB);

router.post(
  '/',
  validateRequest(offeredCourseValidation.create),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offeredCourseController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(offeredCourseValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN)
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN));

export const offeredCourseRoutes = router;
