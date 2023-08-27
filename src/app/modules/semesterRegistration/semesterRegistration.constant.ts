export const semesterRegistrationFilterableFiteds: string[] = [
  'searchTerm',
  'id',
  'academicSemesterId',
];

export const semesterRegistrationSearchableFields: string[] = [];

export const semesterRegistrationRelationalFields: string[] = [
  'academicSemesterId',
];

export const semesterRegistrationRelationalFieldsMapper: {
  [key: string]: string;
} = {
  academicSemesterId: 'academicSemester',
};
