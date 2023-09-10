/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExamType,
  PrismaClient,
  StudentEnrolledCourseMark,
  StudentEnrolledCourseStatus,
} from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IStudentEnrolledCourseMarkFilterRequest } from './studentEnrolledCourseMark.interface';
import { StudentEnrolledCourseMarksUtils } from './studentEnrolledCourseMark.utils';

const createStudentEnrolledCourseDefaultMark = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$transaction' | '$use' | '$on' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrolledCourseId: string;
    academicSemesterId: string;
  }
) => {
  const isExistMidtermData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        examType: ExamType.MIDTERM,
        student: {
          id: payload.studentId,
        },
        studentEnrolledCourse: {
          id: payload.studentEnrolledCourseId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });

  if (!isExistMidtermData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourse: {
          connect: {
            id: payload.studentEnrolledCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.MIDTERM,
      },
    });
  }

  const isExistFinalTermData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        examType: ExamType.FINAL,
        student: {
          id: payload.studentId,
        },
        studentEnrolledCourse: {
          id: payload.studentEnrolledCourseId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });

  if (!isExistFinalTermData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrolledCourse: {
          connect: {
            id: payload.studentEnrolledCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.FINAL,
      },
    });
  }
};
const getAllFromDB = async (
  filters: IStudentEnrolledCourseMarkFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<StudentEnrolledCourseMark[]>> => {
  const { limit, page } = paginationHelpers.calculatePagination(options);

  const marks = await prisma.studentEnrolledCourseMark.findMany({
    where: {
      student: {
        id: filters.studentId,
      },
      academicSemester: {
        id: filters.academicSemesterId,
      },
      studentEnrolledCourse: {
        course: {
          id: filters.courseId,
        },
      },
    },
    include: {
      studentEnrolledCourse: {
        include: {
          course: true,
        },
      },
      student: true,
    },
  });

  return {
    meta: {
      total: marks.length,
      page,
      limit,
    },
    data: marks,
  };
};

const updateStudentMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId, examType, marks } = payload;

  const studentEnrolledCourseMark =
    await prisma.studentEnrolledCourseMark.findFirst({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourse: {
          course: {
            id: courseId,
          },
        },
        examType,
      },
    });

  if (!studentEnrolledCourseMark) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student Enrolled Course Mark Not Found'
    );
  }
  const result = StudentEnrolledCourseMarksUtils.getGradeFromMarks(marks);
  const updateMarks = await prisma.studentEnrolledCourseMark.update({
    where: {
      id: studentEnrolledCourseMark.id,
    },
    data: {
      marks,
      grade: result.grade,
    },
  });

  return updateMarks;
};

const updateFinalMarks = async (payload: any) => {
  const { studentId, academicSemesterId, courseId } = payload;
  const studentEnrolledCourse = await prisma.studentEnrolledCourse.findFirst({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
  });

  if (!studentEnrolledCourse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student Enrolled Course Data Not Found'
    );
  }

  const studentEnrolledCourseMarks =
    await prisma.studentEnrolledCourseMark.findMany({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrolledCourse: {
          course: {
            id: courseId,
          },
        },
      },
    });

  if (!studentEnrolledCourseMarks.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student Enrolled Course Mark Not Found'
    );
  }
  const midTermMarks =
    studentEnrolledCourseMarks.find(item => item.examType === ExamType.MIDTERM)
      ?.marks || 0;
  const finalTermMarks =
    studentEnrolledCourseMarks.find(item => item.examType === ExamType.FINAL)
      ?.marks || 0;

  const totalFinalMarks =
    Math.ceil(midTermMarks * 0.4) + Math.ceil(finalTermMarks * 0.6);
  const result =
    StudentEnrolledCourseMarksUtils.getGradeFromMarks(totalFinalMarks);

  await prisma.studentEnrolledCourse.updateMany({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
    data: {
      grade: result.grade,
      point: result.point,
      totalMarks: totalFinalMarks,
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
  });

  const grades = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        id: studentId,
      },
      status: StudentEnrolledCourseStatus.COMPLETED,
    },
    include: {
      course: true,
    },
  });

  const academicResult = await StudentEnrolledCourseMarksUtils.calcCGPAndGrade(
    grades
  );

  const studentAcademicInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        id: studentId,
      },
    },
  });

  if (studentAcademicInfo) {
    await prisma.studentAcademicInfo.update({
      where: {
        id: studentAcademicInfo.id,
      },
      data: {
        totalCompletedCredit: academicResult.totalCompletedCredit,
        cgpa: academicResult.cgpa,
      },
    });
  } else {
    await prisma.studentAcademicInfo.create({
      data: {
        student: {
          connect: {
            id: studentId,
          },
        },
        totalCompletedCredit: academicResult.totalCompletedCredit,
        cgpa: academicResult.cgpa,
      },
    });
  }

  return grades;
};

export const studentEnrolledCourseMarkService = {
  createStudentEnrolledCourseDefaultMark,
  updateStudentMarks,
  getAllFromDB,
  updateFinalMarks,
};
