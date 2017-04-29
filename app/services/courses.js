import axios from 'axios';

const service = {
  getTopics: () => axios.get('/cours')
};

export default service;

