import { PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';

const createSemesterPayment = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$transaction' | '$use' | '$on' | '$extends'
  >,
  payload: {
    studentId: string;
    academicSemesterId: string;
    totalPaymentAmount: number;
  }
) => {
  const isExist = await prismaClient.studentSemesterPayment.findFirst({
    where: {
      student: {
        id: payload.studentId,
      },
      academicSemester: {
        id: payload.academicSemesterId,
      },
    },
  });

  if (!isExist) {
    const dataToInsert = {
      studentId: payload?.studentId,
      academicSemesterId: payload?.academicSemesterId,
      fullPaymentAmount: payload?.totalPaymentAmount,
      partialPaymentAmount: payload?.totalPaymentAmount * 0.5,
      totalDueAmount: payload?.totalPaymentAmount,
      totalPayedAmount: 0,
    };
    await prismaClient.studentSemesterPayment.create({
      data: dataToInsert,
    });
    console.log('done');
  }
};

export const StudentSemesterPaymentService = {
  createSemesterPayment,
};
