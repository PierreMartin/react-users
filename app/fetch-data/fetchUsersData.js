import { usersService } from '../services';

const fetchData = () => {
  return usersService.getUsers()
          .then(res => res.data);
};

export default fetchData;

