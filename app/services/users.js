import axios from 'axios';

const service = {
    getUsers: () => axios.get('/api/usersList')
};

export default service;

