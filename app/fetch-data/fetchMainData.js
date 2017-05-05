import { datasService } from '../services';

const fetchMainData = () => {
  return datasService().getCourses()
    .then(res => res.data)
    .catch(() => []);
};

export default fetchMainData;

