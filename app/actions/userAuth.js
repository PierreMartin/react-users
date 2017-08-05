import { polyfill } from 'es6-promise';
import request from 'axios';
import { updateUser } from './../fetch-data';
import { push } from 'react-router-redux';
import * as types from 'types';
import md5 from 'spark-md5';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;
const getFieldsMissing = res => res.response && res.response.data && res.response.data.errorField;


function makeUserRequest(method, data, api = '/api/login') {
    return request[method](api, data);
}


// for login / signup :
export function requiredFieldsError(fields) {
  return {
    type: types.MISSING_REQUIRED_FIELDS_USER,
    fields
  };
}

/***************************************** Log In / Sign Up ********************************************/
export function typingLoginSignupUserAction(nameField, valueField) {
  return {
    type: types.TYPING_LOGIN_SIGNUP_USER_ACTION,
    data: {
      [nameField]: valueField
    }
  };
}


/***************************************** Log In ********************************************/
export function beginLogin() {
    return {type: types.MANUAL_LOGIN_USER};
}

export function loginSuccess(message, userObj) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        message,
        userObj
    };
}

export function loginError(message) {
    return {
        type: types.LOGIN_ERROR_USER,
        message
    };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/api/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message, response.data.userObj));
          dispatch(push('/user/' + response.data.userObj._id)); // redirection
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        if (err.response.data.errorField) {
          // missing required fields :
          dispatch(requiredFieldsError(getFieldsMissing(err)));
        } else {
          // others errors :
          dispatch(loginError(getMessage(err)));
        }
      });
  };
}


/***************************************** Sign Up ********************************************/
export function signUpError(email, message) {
    return {
        type: types.SIGNUP_ERROR_USER,
        message,
        email
    };
}

export function beginSignUp() {
    return {type: types.SIGNUP_USER};
}

export function signUpSuccess(message, userObj) {
    return {
        type: types.SIGNUP_SUCCESS_USER,
        message,
        userObj
    };
}

export function signUp(data) {
    return dispatch => {
        dispatch(beginSignUp());

        return makeUserRequest('post', data, '/api/signup')
            .then(response => {
                if (response.status === 200) {
                    dispatch(signUpSuccess(response.data.message, response.data.userObj));
                    dispatch(push('/user/' + response.data.userObj._id)); // redirection
                } else {
                    dispatch(signUpError(data.email, 'Oops! Something went wrong'));
                }
            })
            .catch(err => {
                if (err.response.data.errorField) {
                  // missing required fields :
                  dispatch(requiredFieldsError(getFieldsMissing(err)));
                } else {
                  // acount already exist or others errors :
                  dispatch(signUpError(data.email, getMessage(err)));
                }
            });
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


/***************************************** UPDATE user ********************************************/
export function typingUpdateUserAction(nameField, valueField) {
  return {
    type: types.TYPING_UPDATE_USER_ACTION,
		data: {
			[nameField]: valueField
		}
  };
}

export function updateUserError(message) {
	return {
		type: types.UPDATE_USER_FAILURE,
		message
	};
}

export function updateUserSuccess(res) {
	return {
		type: types.UPDATE_USER_SUCCESS,
		message : res.message,
		userObj: res.userObj
	};
}

export function updateUserAction(data, id) {
	return dispatch => {
		return updateUser(data, id)
			.then((response) => {
				if (response.status === 200) {
					dispatch(updateUserSuccess(response.data));
				} else {
					dispatch(updateUserError(response.data.message));
				}
			})
			.catch((err) => {
				dispatch(updateUserError(getMessage(err)));
			});
	};
}

