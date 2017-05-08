import { apiCours, apiUsers } from './services';
import * as types from 'types';

/********************************************** COURS ***********************************************/
export const getCours = (params, store) => {
    return apiCours().getCours()
        .then((res) => {
            store.dispatch({type: types.GET_COURS_SUCCESS, data: res.data});
            return res.data; // le return sert a rien car on dispatch juste avant
        })
        .catch(() => {
            store.dispatch({type: types.GET_COURS_FAILURE, data: res.data});
            return [];
        });
};


/********************************************** USERS ***********************************************/
export const getUsers = (params, store) => {
    return apiUsers().getUsers()
        .then((res) => {
            store.dispatch({type: types.GET_USERS_SUCCESS, data: res.data});
            return res.data; // le return sert a rien car on dispatch juste avant
        })
        .catch(() => {
            store.dispatch({type: types.GET_USERS_FAILURE, data: res.data});
            return [];
        });
};


export const getUser = (params, store) => {
    return apiUsers().getUser(params.id)
        .then((res) => {
            store.dispatch({type: types.GET_USER_SUCCESS, data: res.data});
            return res.data; // le return sert a rien car on dispatch juste avant
        })
        .catch(() => {
            store.dispatch({type: types.GET_USER_FAILURE, data: res.data});
            return [];
        });
};

