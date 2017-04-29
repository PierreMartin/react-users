import { voteService } from '../services';

const fetchData = () => {
  return voteService.getCourses()
          .then(res => res.data);
};

export default fetchData;

