import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterableField } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created successfully',
    data: result,
  });
});

const getAllSemestersFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, AcademicSemesterFilterableField);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AcademicSemesterService.getAllSemestersFromDB(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllSemestersFromDB,
  getDataById,
};
