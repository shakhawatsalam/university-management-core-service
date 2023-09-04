import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseSectionController } from './offredCourseSection.controller';
import { OfferedCourseSectionValidation } from './offredCourseSection.validation';

const router = express.Router();
router.get('/', offeredCourseSectionController.getAllFromDB);
router.get('/:id', offeredCourseSectionController.getByIdFromDB);
router.post('/', offeredCourseSectionController.insertIntoDB);

router.patch(
  '/:id',
  validateRequest(OfferedCourseSectionValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offeredCourseSectionController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offeredCourseSectionController.deleteByIdFromDB
);

export const offeredCourseSectionRoutes = router;
