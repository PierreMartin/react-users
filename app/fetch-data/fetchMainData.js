import { datasService } from '../services';
import * as types from 'types';

const fetchCoursData = (params, store) => {
  return datasService().getCourses()
    .then((res) => {
        store.dispatch({type: types.GET_COURS_SUCCESS, data: res.data});
        return res.data
    })
    .catch(() => []);
};

export default fetchCoursData;

