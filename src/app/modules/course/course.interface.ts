export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses?: {
    corseId: string;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};
