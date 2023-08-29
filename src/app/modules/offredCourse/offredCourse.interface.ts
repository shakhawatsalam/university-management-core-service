export type ICreateOffredCourse = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: string[];
};

export type IOffredCourseFilterRequest = {
  searchTerm?: string | undefined;
  semesterRegistrationId?: string | undefined;
  courseId?: string | undefined;
  academicDepartment?: string | undefined;
};
