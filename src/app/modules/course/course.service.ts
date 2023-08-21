import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICourseCreateData } from './course.interface';

const insertIntoDB = async (
  data: ICourseCreateData
): Promise<ICourseCreateData> => {
  const { preRequisiteCourses, ...courseData } = data;
  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        const createPrereqisite =
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              prerequisitId: preRequisiteCourses[index].corseId,
            },
          });
        console.log(createPrereqisite);
      }
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        prerequisite: {
          include: {
            preRequisit: true,
          },
        },
        prerequisiteFor: {
          include: {
            preRequisit: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create');
};

export const CourseService = {
  insertIntoDB,
};
