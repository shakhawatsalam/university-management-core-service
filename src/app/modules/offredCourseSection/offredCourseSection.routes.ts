import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { offredCourseSectionController } from './offredCourseSection.controller';
import { OfferedCourseSectionValidation } from './offredCourseSection.validation';

const router = express.Router();
router.get('/', offredCourseSectionController.getAllFromDB);
router.get('/:id', offredCourseSectionController.getByIdFromDB);
router.post('/', offredCourseSectionController.insertIntoDB);

router.patch(
  '/:id',
  validateRequest(OfferedCourseSectionValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offredCourseSectionController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offredCourseSectionController.deleteByIdFromDB
);

export const offredCourseSectionRoutes = router;
