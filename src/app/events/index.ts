import initFacultyEvent from '../modules/faculty/faculty.event';
import initStudentEvent from '../modules/student/student.event';

const subscribeToEvent = () => {
  initStudentEvent();
  initFacultyEvent();
};

export default subscribeToEvent;
