import { combineReducers } from 'redux';
import user from './user';
import cours from './cours';
import message from './message';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../types';


/** LOADER - comment est défini la partie du state 'state = false' ??? (on a pas de composant lié à cette méthode, contrairement aux autre reducers)  **/
const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.CREATE_REQUEST:      /** 'CREATE_REQUEST' n'est pas dispatché par les actions, mais par les fichiers 'app/server.jsx' et 'app/client.jsx' **/
            return true;
        case types.REQUEST_SUCCESS:
        case types.REQUEST_FAILURE:
            return false;
        default:
            return state;
    }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    isFetching,
    cours,
    user,
    message,
    routing
});

export default rootReducer;
