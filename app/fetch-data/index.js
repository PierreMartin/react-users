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

export const getUserAuth = (params, store) => {
  const state = store.getState();

  return apiUsers().getUser(state.userAuth.userObj._id)
    .then((res) => {
      store.dispatch({type: types.GET_USER_SUCCESS, data: res.data});
      return res.data; // le return sert a rien car on dispatch juste avant
    })
    .catch((err) => {
      store.dispatch({type: types.GET_USER_FAILURE, message: err.message});
      return {};
    });
};


// dispatch define in actions/userAuth :
export const updateUser = (data, id) => {
	return apiUsers().updateUser(data, id)
		.then((res) => {
			return res;
		})
		.catch(err => {
			return Promise.reject(err);
		});
};


export const createAvatarUser = (data, params) => {
	return apiUsers().createAvatarUser(data, params.id, params.avatarId)
		.then((res) => {
			return res;
		})
		.catch(err => {
			return Promise.reject(err);
		});
};