import { usersService } from '../services';

const fetchData = () => {
    return usersService().getUsers()
        .then(res => res.data)
        .catch(() => []);
};

export default fetchData;

