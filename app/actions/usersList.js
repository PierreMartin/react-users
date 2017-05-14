import { polyfill } from 'es6-promise';
import * as types from '../types';
import { api } from '../fetch-data';

polyfill();


/***************************************** GET user ********************************************/
export function getUserSuccess(data) {
    return {
        type: types.GET_USER_SUCCESS,
        data: data
    };
}

export function getUserFailure(id) {
    return {
        type: types.GET_USER_FAILURE,
        id: id,
        error: 'Oops! Something went wrong and we couldn\'t create your cours'
    };
}

export function getUser(id) {
    return (dispatch) => {
        if (!id) return;

        return api().getUser({ id })
            .then((res) => {
                if (res.status === 200) {
                    return dispatch(getUserSuccess(res.data));
                }
            })
            .catch(() => {
                return dispatch(getUserFailure(id));
            });
    };
}