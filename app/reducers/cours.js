/**
 * le reducer permet d'updater le 'state container'
 **/

/** action en params    => valeurs retourné dans les fichiers 'action' par un 'dispatch(...)'    exemple => return { type: types.TYPING_CREATE_COUR_ACTION, newCours: text }; **/
/** state               => une partie du 'state container' défini dans "mapStateToProps" du composant => connect(mapStateToProps, ...) **/

import { combineReducers } from 'redux';
import * as types from '../types';

const cours = (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_COURS_SUCCESS:
            return {
                id: action.id,
                count: action.count,
                text: action.text,
                isVoted: action.isVoted
            };
        case types.RATING_COURS_SUCCESS:
            if (state.id === action.id) {
                return {...state, count: state.count + action.count, isVoted: action.isVoted};
            }
            return state;
        default:
            return state;
    }
};


const courses = (state = [], action) => {
    /*
    console.log('---- courses action.data ----');
    console.log('type   => ', action.type);
    console.log('params => ', action.data);
    */

    switch (action.type) {
        case types.GET_COURS_SUCCESS:
            if (action.data) return action.data;
            return state;
        case types.GET_COURS_FAILURE:
            return state;
        case types.CREATE_COURS_SUCCESS:
            return [...state, cours(undefined, action)];
        case types.CREATE_COURS_FAILURE:
            return state.filter(t => t.id !== action.id);
        case types.DESTROY_COURS_SUCCESS:
            return state.filter(t => t.id !== action.id);
        case types.RATING_COURS_SUCCESS:
            return state.map(t => cours(t, action));
        default:
            return state;
    }
};


// 'typingCreateCourState' sera la propriété dans l'objet state
const typingCreateCourState = (state = '', action) => {
    switch (action.type) {
        case types.TYPING_CREATE_COUR_ACTION:
            return action.typingCurrentValue;
        case types.CREATE_COURS_SUCCESS:
            return '';
        default:
            return state;
    }
};

const coursReducer = combineReducers({
    courses,
		typingCreateCourState
});

export default coursReducer;
