import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offredCourseService } from './offredCourse.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await offredCourseService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offred Course Created',
    data: result,
  });
});

export const offredCourseController = {
  insertIntoDB,
};
