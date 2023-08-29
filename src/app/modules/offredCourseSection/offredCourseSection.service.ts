import { OffredCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

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

export const OffredCourseSectionService = {
  insertIntoDB,
};
