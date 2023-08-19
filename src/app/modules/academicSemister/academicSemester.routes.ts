import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();
router.get('/', AcademicSemesterController.getAllSemestersFromDB);
router.get('/:id', AcademicSemesterController.getDataById);
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.CreateAcademicSemesterZodSchema),
  AcademicSemesterController.insertIntoDB
);

export const AcademicSemesterRoutes = router;
