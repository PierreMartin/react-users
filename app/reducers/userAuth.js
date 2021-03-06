import * as types from 'types';
import { combineReducers } from 'redux';


const isLogin = (state = true, action) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (state = '', action) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (state = false, action) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (state = false, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

/************* login/signup - 'userObj' - typing *************/
const typingLoginSignupUserState = (state = {}, action) => {
  switch (action.type) {
    case types.TYPING_LOGIN_SIGNUP_USER_ACTION:
      return Object.assign({}, state, action.data);
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
      return {};
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return state;
    default:
      return state;
  }
};

/************* updating - 'userObj' - typing *************/
const typingUpdateUserState = (state = {}, action) => {
	switch (action.type) {
		case types.TYPING_UPDATE_USER_ACTION:
			return Object.assign({}, state, action.data);
		case types.UPDATE_USER_SUCCESS:
		case types.UPDATE_USER_FAILURE:
		case types.LOGOUT_SUCCESS_USER:
			return {};
		default:
			return state;
	}
};

/************* login/signup - 'userObj' - submit *************/
const userObj = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      if (action.userObj) return action.userObj;
      return state;
		case types.UPDATE_USER_SUCCESS:
			if (action.userObj) {
        return Object.assign({}, state, action.userObj);
			}
			return state;
		case types.UPDATE_USER_FAILURE:
			return state;
		case types.AVATAR_UPDATE_USER_SUCCESS:
			if (action.userObj && state.avatarsSrc) {
				var avatarsListState = state.avatarsSrc;
				var isAvatarAlreadyExist = false;

				for (var i = 0; i < avatarsListState.length; i++) {
					if (avatarsListState[i].avatarId === action.userObj.avatarId) {
						avatarsListState[i].mainProfil = action.userObj.mainProfil;
						avatarsListState[i].thumbnail1 = action.userObj.thumbnail1;
						isAvatarAlreadyExist = true;
						break;
					}
				}

				if (!isAvatarAlreadyExist) {
					avatarsListState.push(action.userObj);
				}

				return Object.assign({}, state, {avatarsSrc: avatarsListState});
			}
			return state;
		case types.AVATAR_UPDATE_USER_FAILURE:
			return state;
		case types.AVATAR_MAIN_SELECTED_SUCCESS:
			if (typeof action.avatarMainSelected !== 'undefined') {
				return {...state, avatarMainSelected: action.avatarMainSelected};
			}
			return state;
		case types.AVATAR_MAIN_SELECTED_FAILURE:
			return state;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return {};
    default:
      return state;
  }
};

const missingRequiredField = (state = {}, action) => {
  switch (action.type) {
    case types.MISSING_REQUIRED_FIELDS_USER:
      return action.fields;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.UPDATE_USER_SUCCESS:
    case types.UPDATE_USER_FAILURE:
      return {};
    default:
      return state;
  }
};

const avatarUploadModalIsOpenState = (state = false, action) => {
  switch (action.type) {
    case types.AVATAR_UPLOAD_MODAL_ISOPEN_ACTION:
      return action.isOpen;
    default:
      return state;
  }
};

const avatarUploadImagePreviewState = (state = {}, action) => {
  switch (action.type) {
    case types.AVATAR_UPLOAD_IMAGEPREVIEW_ACTION:
      return action.data;
    default:
      return state;
  }
};


const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message,
  userObj,
  typingLoginSignupUserState,
	typingUpdateUserState,
	missingRequiredField,
  avatarUploadModalIsOpenState,
  avatarUploadImagePreviewState,
});

export default userReducer;
