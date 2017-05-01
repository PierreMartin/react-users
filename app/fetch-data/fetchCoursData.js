import { coursService } from '../services';

const fetchData = () => {
  return coursService.getCourses()
          .then(res => res.data);
};

export default fetchData;

