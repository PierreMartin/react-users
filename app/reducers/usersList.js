import { combineReducers } from 'redux';
import * as types from '../types';

const user = (state = {}, action) => {
    switch (action.type) {
        case types.GET_USERS_SUCCESS:
            return {
                id: action.data.id,
                email: action.data.email
            };
        default:
            return state;
    }
};


const users = (state = [], action) => {
    switch (action.type) {
        case types.GET_USERS_SUCCESS:
            return [...state, user(undefined, action)];
        case types.GET_USERS_FAILURE:
            return state.filter(t => t.id !== action.data.id);
        default:
            return state;
    }
};


const usersReducer = combineReducers({
    users
});

export default usersReducer;
