import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'AcademicDepartmentId is Required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester Registration Is Required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'Course ID is Required',
      }),
      {
        required_error: "Course Id's are Required",
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    academicDepartmentId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
    courseIds: z.string().optional(),
  }),
});

export const offredCourseValidation = {
  create,
  update,
};
