export const AcademicSemesterSearchableField = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

export const AcademicSemesterFilterableField = [
  'searchTerm',
  'code',
  'startMonth',
  'endMonth',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester.updated';
export const EVENT_ACADEMIC_SEMESTER_DELETED = 'academic-semester.deleted';

export const academicSemesterTitles: string[] = ['Autumn', 'Summer', 'Fall'];
export const academicSemesterCodes: string[] = ['01', '02', '03'];
export const academicSemesterMonths: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
