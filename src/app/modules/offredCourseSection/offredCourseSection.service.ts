import { OffredCourseSection, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  offeredCourseRelationalFields,
  offeredCourseSearchableFields,
} from '../offredCourse/offredCourse.constants';
import { offeredCourseSectionRelationalFieldsMapper } from './offredCourseSection.constants';
import { IOfferedCourseSectionFilterRequest } from './offredCourseSection.interface';

const insertIntoDB = async (data: any): Promise<OffredCourseSection> => {
  const isExistOffredCourse = await prisma.offredCourse.findFirst({
    where: {
      id: data.offredCourseId,
    },
  });
  if (!isExistOffredCourse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offred Course Does Not Exist');
  }
  data.semesterRegistrationId = isExistOffredCourse.semesterRegistrationId;
  const result = await prisma.offredCourseSection.create({
    data,
  });

  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseSectionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OffredCourseSection[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseRelationalFields.includes(key)) {
          return {
            [offeredCourseSectionRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.OffredCourseSectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.offredCourseSection.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      offredCourse: {
        include: {
          course: true,
        },
      },
    },
  });

  const total = await prisma.offredCourseSection.count({
    where: whereCondition,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (
  id: string
): Promise<OffredCourseSection | null> => {
  // OffredCourseSection
  const result = await prisma.offredCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<OffredCourseSection>
): Promise<OffredCourseSection> => {
  //update
  const result = await prisma.offredCourseSection.update({
    where: {
      id,
    },
    data: payload,
    include: {
      offredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<OffredCourseSection> => {
  const result = await prisma.offredCourseSection.delete({
    where: {
      id,
    },
    include: {
      offredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

export const OffredCourseSectionService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
