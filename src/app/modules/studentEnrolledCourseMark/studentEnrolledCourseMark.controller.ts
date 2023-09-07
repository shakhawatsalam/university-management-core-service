import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';

const updateStudentMark = catchAsync(async (req: Request, res: Response) => {
  const result = await studentEnrolledCourseMarkService.updateStudentMark(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks Updated',
    data: result,
  });
});

export const StudentEnrolledCourseMarksController = {
  updateStudentMark,
};
