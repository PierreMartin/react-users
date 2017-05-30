import { apiCours, apiUsers } from './services';
import * as types from 'types';

/********************************************** COURS ***********************************************/
export const getCours = (params, store) => {
    return apiCours().getCours()
        .then((res) => {
            store.dispatch({type: types.GET_COURS_SUCCESS, data: res.data});
            return res.data; // le return sert a rien car on dispatch juste avant
        })
        .catch((err) => {
            store.dispatch({type: types.GET_COURS_FAILURE, message: err.message});
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
        .catch((err) => {
            store.dispatch({type: types.GET_USERS_FAILURE, message: err.message});
            return [];
        });
};


export const getUser = (params, store) => {
    return apiUsers().getUser(params.id)
        .then((res) => {
            store.dispatch({type: types.GET_USER_SUCCESS, data: res.data});
            return res.data; // le return sert a rien car on dispatch juste avant
        })
        .catch((err) => {
            store.dispatch({type: types.GET_USER_FAILURE, message: err.message});
            return {};
        });
};

export const updateUser = (params, store) => {
	return apiUsers().updateUser(params)
		.then((res) => {
			store.dispatch({type: types.UPDATE_USER_SUCCESS, userObj: res.data.userObj});
			return res.data; // le return sert a rien car on dispatch juste avant
		})
		.catch((err) => {
			store.dispatch({type: types.UPDATE_USER_FAILURE, message: err.message});
			return {};
		});
};