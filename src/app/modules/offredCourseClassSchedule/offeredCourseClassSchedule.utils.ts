import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

const checkRoomAvailable = async (data: OfferedCourseClassSchedule) => {
  const alreadyBookedRoomOnDay =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        room: {
          id: data.roomId,
        },
      },
    });

  // from data base
  const existingSlots = alreadyBookedRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeeK: schedule.dayOfWeek,
  }));

  // from front-end
  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeeK: data.dayOfWeek,
  };

  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Room is already Booked');
  }
};

const checkFacultyAvailable = async (data: OfferedCourseClassSchedule) => {
  const alreadyFacultyAssigned =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        faculty: {
          id: data.facultyId,
        },
      },
    });

  // from data base
  const existingSlots = alreadyFacultyAssigned.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeeK: schedule.dayOfWeek,
  }));

  // from front-end
  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeeK: data.dayOfWeek,
  };

  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty is already Booked');
  }
};

export const OfferedCourseClassScheduleUtils = {
  checkRoomAvailable,
  checkFacultyAvailable,
};
