import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeCoursRequest(method, id, data, api = '/api/cours') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}


/***************************************** Fetch users ********************************************/
/*
export function fetchUsers() {
    return {
        type: types.GET_USERS,
        promise: makeCoursRequest('get')
    };
}
*/
