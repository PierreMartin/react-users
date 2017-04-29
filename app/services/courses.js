import axios from 'axios';

const service = {
  getCourses: () => axios.get('/cours')
};

export default service;

