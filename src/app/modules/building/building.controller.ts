import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constant';
import { BuildingService } from './building.service';

const insertInToDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertInToDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Created successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BuildingService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BuildingController = {
  insertInToDb,
  getAllFromDb,
};
