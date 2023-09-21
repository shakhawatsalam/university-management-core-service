import { RedisClient } from '../../../shared/redis';
import { EVENT_STUDENT_CREATED } from './student.constants';
import { StudentService } from './student.service';

const initStudentEvent = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    await StudentService.createStudentFromEvent(data);
  });
};

export default initStudentEvent;
