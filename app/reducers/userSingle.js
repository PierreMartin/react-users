import { combineReducers } from 'redux';
import * as types from '../types';


const user = (state = {}, action) => {
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
    user
});

export default userReducer;
