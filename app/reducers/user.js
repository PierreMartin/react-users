import { combineReducers } from 'redux';
import * as types from '../types';


const usersList = (state = [], action) => {
    switch (action.type) {
        case types.GET_USERS_SUCCESS:
            if (action.data) return action.data;
            return state;
        case types.GET_USERS_FAILURE:
            return state;
        default:
            return state;
    }
};

const userSingle = (state = {}, action) => {
    switch (action.type) {
        case types.GET_USER_SUCCESS:
            if (action.data) return action.data;
            return state;
        case types.GET_USER_FAILURE:
            return state;
        default:
            return state;
    }
};

const userReducer = combineReducers({
    usersList,
    userSingle,
});

export default userReducer;
