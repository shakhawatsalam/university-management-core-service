import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    code: z.string({
      required_error: 'Code is Required',
    }),
    credits: z.number({
      required_error: 'Credits is Required',
    }),
    preRequisiteCourses: z.array(
      z
        .object({
          courseId: z.string({}),
        })
        .optional()
    ),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string({}),
          isDeleted: z.boolean({}).optional(),
        })
      )
      .optional(),
  }),
});

export const CourseValidation = {
  create,
  update,
};
