import express from 'express';
import { offredCourseSectionController } from './offredCourseSection.controller';

const router = express.Router();

router.post('/', offredCourseSectionController.insertIntoDB);

export const offredCourseSectionRoutes = router;
