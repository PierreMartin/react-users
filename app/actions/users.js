import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import * as types from 'types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;


function makeUserRequest(method, data, api = '/api/login') {
    return request[method](api, data);
}


/***************************************** Log In ********************************************/
export function beginLogin() {
    return {type: types.MANUAL_LOGIN_USER};
}

export function loginSuccess(message) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        message
    };
}

export function loginError(message) {
    return {
        type: types.LOGIN_ERROR_USER,
        message
    };
}


/***************************************** Sign Up ********************************************/
export function signUpError(message) {
    return {
        type: types.SIGNUP_ERROR_USER,
        message
    };
}

export function beginSignUp() {
    return {type: types.SIGNUP_USER};
}

export function signUpSuccess(message) {
    return {
        type: types.SIGNUP_SUCCESS_USER,
        message
    };
}


/***************************************** Log Out ********************************************/
export function beginLogout() {
    return {type: types.LOGOUT_USER};
}

export function logoutSuccess() {
    return {type: types.LOGOUT_SUCCESS_USER};
}

export function logoutError() {
    return {type: types.LOGOUT_ERROR_USER};
}

export function toggleLoginMode() {
    return {type: types.TOGGLE_LOGIN_MODE};
}

export function manualLogin(data) {
    return dispatch => {
        dispatch(beginLogin());

        return makeUserRequest('post', data, '/api/login')
            .then(response => {
                if (response.status === 200) {
                    dispatch(loginSuccess(response.data.message)); // "response.data.message" => from server
                    dispatch(push('/dashboard')); // TODO - auth : ici on défini la redirection
                } else {
                    dispatch(loginError('Oops! Something went wrong!'));
                }
            })
            .catch(err => {
                dispatch(loginError(getMessage(err)));
            });
    };
}

export function signUp(data) {
    return dispatch => {
        dispatch(beginSignUp());

        return makeUserRequest('post', data, '/api/signup')
            .then(response => {
                if (response.status === 200) {
                    dispatch(signUpSuccess(response.data.message));
                    dispatch(push('/'));
                } else {
                    dispatch(signUpError('Oops! Something went wrong'));
                }
            })
            .catch(err => {
                dispatch(signUpError(getMessage(err)));
            });
    };
}

export function logOut() {
    return dispatch => {
        dispatch(beginLogout());

        return makeUserRequest('post', null, '/api/logout')
            .then(response => {
                if (response.status === 200) {
                    dispatch(logoutSuccess());
                } else {
                    dispatch(logoutError());
                }
            });
    };
}
