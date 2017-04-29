import axios from 'axios';

const service = {
  getCourses: () => axios.get('/api/cours')
};

export default service;

