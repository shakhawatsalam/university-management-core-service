import { OffredCourse, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericErrorResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import {
  offeredCourseRelationalFields,
  offeredCourseRelationalFieldsMapper,
} from './offredCourse.constants';
import {
  ICreateOffredCourse,
  IOffredCourseFilterRequest,
} from './offredCourse.interface';

const insertIntoDB = async (
  data: ICreateOffredCourse
): Promise<OffredCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;
  const result: OffredCourse[] = [];
  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });
    if (!alreadyExist) {
      const insertOffredCourse = await prisma.offredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      result.push(insertOffredCourse);
    }
  });
  return result;
};

const getAllFromDB = async (
  filters: IOffredCourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericErrorResponse<OffredCourse[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: ['semesterRegistrationId', 'courseId', 'academicDepartmentId'].map(
        field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })
      ),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseRelationalFields.includes(key)) {
          return {
            [offeredCourseRelationalFieldsMapper[key]]: {
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

  const whereCondition: Prisma.OffredCourseWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.offredCourse.findMany({
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.offredCourse.count({
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

const getByIdFromDB = async (id: string): Promise<OffredCourse | null> => {
  const result = await prisma.offredCourse.findUnique({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<OffredCourse>
): Promise<OffredCourse> => {
  const result = await prisma.offredCourse.update({
    where: {
      id,
    },
    data: payload,
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<OffredCourse> => {
  const result = await prisma.offredCourse.delete({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const offredCourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
