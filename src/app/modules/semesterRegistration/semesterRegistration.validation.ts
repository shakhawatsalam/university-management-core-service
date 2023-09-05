import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start Date is Required',
    }),
    endDate: z.string({
      required_error: 'End date is Required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic semester id is required',
    }),
    minCredit: z.number({
      required_error: 'Min credit is required',
    }),
    maxCredits: z.number({
      required_error: 'Max credit is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    academicSemesterId: z.string().optional(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],
        {}
      )
      .optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

const enrollOrWithdawCourse = z.object({
  body: z.object({
    offeredCourseId: z.string({
      required_error: 'Offered Course Id is Required',
    }),
    offeredCourseSectionId: z.string({
      required_error: 'Offered Course Section Id is Required',
    }),
  }),
});

export const SemesterRegistrationValidation = {
  create,
  update,
  enrollOrWithdawCourse,
};
