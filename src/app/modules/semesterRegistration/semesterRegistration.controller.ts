/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFiteds } from './semesterRegistration.constant';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, semesterRegistrationFilterableFiteds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SemesterRegistrationService.getAllFromDB(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration fetched successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration fetched successfully',
    data: result,
  });
});
const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration updateOne id DB successfully',
    data: result,
  });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.startMyRegistration(
    user.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student SemesterRegistration started Successfully',
    data: result,
  });
});

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.enrollIntoCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student SemesterRegistration Course Enrolled Successfully',
    data: result,
  });
});
const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.withdrawFromCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student  withdrawFromCourse Successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateOneInDB,
  startMyRegistration,
  enrollIntoCourse,
  withdrawFromCourse,
};
