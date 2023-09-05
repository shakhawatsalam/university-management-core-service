/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
  StudentSemesterRegistration,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { studentSemesterRegistrationCourseService } from '../studentSemesterRegistrationCourse/studentSemesterRegistrationCourse.service';
import {
  semesterRegistrationRelationalFields,
  semesterRegistrationRelationalFieldsMapper,
  semesterRegistrationSearchableFields,
} from './semesterRegistration.constant';
import {
  IEnrollCoursePayload,
  ISemesterRegistrationFilterRequest,
} from './semesterRegistration.interface';

const insertIntoDB = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isAnySemesterRegUpcomingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });

  if (isAnySemesterRegUpcomingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isAnySemesterRegUpcomingOrOngoing.status} registration`
    );
  }
  const result = await prisma.semesterRegistration.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: ISemesterRegistrationFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: semesterRegistrationSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => {
        if (semesterRegistrationRelationalFields.includes(key)) {
          return {
            [semesterRegistrationRelationalFieldsMapper[key]]: {
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

  const whereCondition: Prisma.SemesterRegistrationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.semesterRegistration.findMany({
    include: {
      academicSemester: true,
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

  const total = await prisma.semesterRegistration.count({
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
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const isExist = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data Not Found');
  }

  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.UPCOMING &&
    payload.status !== SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from UPCOMING to ONGOING'
    );
  }
  if (
    payload.status &&
    isExist.status === SemesterRegistrationStatus.ONGOING &&
    payload.status !== SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from ONGOING to ENDED'
    );
  }

  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const deleteByIdFromDB = async (
  id: string
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
    include: {
      academicSemester: true,
    },
  });
  return result;
};

const startMyRegistration = async (
  authUserId: string
): Promise<{
  semesterRegistration: SemesterRegistration | null;
  studentSemesterRegistration: StudentSemesterRegistration | null;
}> => {
  const StudentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  if (!StudentInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student Info not found');
  }

  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: {
        in: [
          SemesterRegistrationStatus.ONGOING,
          SemesterRegistrationStatus.UPCOMING,
        ],
      },
    },
  });
  if (
    semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Registration is not Started yet'
    );
  }
  let studentRegistration = await prisma.studentSemesterRegistration.findFirst({
    where: {
      student: {
        id: StudentInfo?.id,
      },
      semesterRegistration: {
        id: semesterRegistrationInfo?.id,
      },
    },
  });

  if (!studentRegistration) {
    studentRegistration = await prisma.studentSemesterRegistration.create({
      data: {
        student: {
          connect: {
            id: StudentInfo?.id,
          },
        },
        semesterRegistration: {
          connect: {
            id: semesterRegistrationInfo?.id,
          },
        },
      },
    });
  }
  return {
    semesterRegistration: semesterRegistrationInfo,
    studentSemesterRegistration: studentRegistration,
  };
};

const enrollIntoCourse = async (
  authUserId: string,
  payload: IEnrollCoursePayload
): Promise<{
  message: string;
}> => {
  return studentSemesterRegistrationCourseService.enrollIntoCourse(
    authUserId,
    payload
  );
};
const withdrawFromCourse = async (
  authUserId: string,
  payload: IEnrollCoursePayload
): Promise<{
  message: string;
}> => {
  return studentSemesterRegistrationCourseService.withdrawFromCourse(
    authUserId,
    payload
  );
};
export const SemesterRegistrationService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateOneInDB,
  startMyRegistration,
  enrollIntoCourse,
  withdrawFromCourse,
};
