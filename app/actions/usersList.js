import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from '../types';

polyfill();


export function makeUsersRequest(method, id, data, api = '/api/usersList') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}


/***************************************** GET users ********************************************/
/*export function fetchUsers() {
    return {
        type: types.GET_USERS_SUCCESS,
        data: makeUsersRequest('get')
    };
}*/


/*
export function createCoursSuccess(data) {
    return {
        type: types.GET_USERS_SUCCESS,
        data: data
    };
}

export function createCoursFailure() {
    return {
        type: types.GET_USERS_FAILURE,
        error: 'Oops! Something went wrong and we couldn\'t create your cours'
    };
}


export function fetchUsers() {
    console.log('TESTT');
    return (dispatch, getState) => {

        // request :
        return makeUsersRequest('get')
            .then(res => {
                console.log(res);
                if (res.status === 200) return dispatch(createCoursSuccess(res.data));
            })
            .catch(() => {
                return dispatch(createCoursFailure());
            });
    };
}
*/

