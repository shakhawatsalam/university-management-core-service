export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses?: IPrerequisitesCourseRequest[];
};

export type IPrerequisitesCourseRequest = {
  courseId: string;
  isDeleted?: null;
};
export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
