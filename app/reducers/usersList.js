import { combineReducers } from 'redux';
import * as types from '../types';

const user = (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_COURS_SUCCESS:
            return {
                id: action.id,
                count: action.count,
                text: action.text,
                isVoted: action.isVoted
            };
        default:
            return state;
    }
};


const users = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SUCCESS:
            if (action.data) return action.data;
            return state;
        case types.CREATE_COURS_SUCCESS:    // GET_USERS_SUCCESS
            return [...state, user(undefined, action)];
        case types.CREATE_COURS_FAILURE:    // GET_USERS_FAILURE
            return state.filter(t => t.id !== action.id);
        default:
            return state;
    }
};


const coursReducer = combineReducers({
    users
});

export default coursReducer;
