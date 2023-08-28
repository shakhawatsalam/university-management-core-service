import { OffredCourseSection } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: OffredCourseSection
): Promise<OffredCourseSection> => {
  const result = await prisma.offredCourseSection.create({
    data,
  });

  return result;
};

export const OffredCourseSectionService = {
  insertIntoDB,
};
