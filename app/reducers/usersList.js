import { combineReducers } from 'redux';
import * as types from '../types';

const user = (state = {}, action) => {
    switch (action.type) {
        case types.SIGNUP_SUCCESS_USER:
            return {
                id: action.id,
                email: action.email
            };
        default:
            return state;
    }
};


const users = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SUCCESS: // TODO voir ici si enlever
            if (action.data) return action.data;
            return state;
        case types.SIGNUP_SUCCESS_USER:
            return [...state, user(undefined, action)];
        case types.SIGNUP_ERROR_USER:
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }
};


const coursReducer = combineReducers({
    users
});

export default coursReducer;
