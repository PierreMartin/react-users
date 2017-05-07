import { combineReducers } from 'redux';
import * as types from '../types';


const users = (state = [], action) => {
    /*
    console.log('---- users action.data ----');
    console.log('type   => ', action.type);
    console.log('params => ', action.data);
    */

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


const usersReducer = combineReducers({
    users
});

export default usersReducer;
