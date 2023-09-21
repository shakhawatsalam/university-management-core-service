import { RedisClient } from '../../../shared/redis';
import { EVENT_FACULTY_CREATED } from './faculty.constants';
import { FacultyService } from './faculty.service';

const initFacultyEvent = async () => {
  RedisClient.subscribe(EVENT_FACULTY_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    await FacultyService.createFacultyFromEvent(data);
  });
};

export default initFacultyEvent;
