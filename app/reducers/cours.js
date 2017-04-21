/**
 * le reducer permet d'updater le 'state container'
 **/

/** action en params    => valeurs retourné dans les fichiers 'action' par un 'dispatch(...)'    exemple => return { type: types.TYPING, newCours: text }; **/
/** state               => une partie du 'state container' défini dans "mapStateToProps" du composant => connect(mapStateToProps, ...) **/

import { combineReducers } from 'redux';
import * as types from '../types';

const cours = (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_TOPIC_REQUEST:
            return {
                id: action.id,
                count: action.count,
                text: action.text,
                isVoted: action.isVoted
            };
        case types.RATING_USER:
            if (state.id === action.id) {
                return {...state, count: state.count + action.count, isVoted: action.isVoted};
            }
            return state;
        default:
            return state;
    }
};


const courses = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SUCCESS:                                 // quand on charge la page, ou au changement d'url
            if (action.data) return action.data;
            return state;
        case types.CREATE_TOPIC_REQUEST:                            // quand on ajoute un nouveau topic
            return [...state, cours(undefined, action)];            // topic() va retourner un objet correpondant au nouveau topic
        case types.CREATE_TOPIC_FAILURE:                            // dans les actions, si CREATE_TOPIC_FAILURE est dispatché (à cause d'une rreur)
            return state.filter(t => t.id !== action.id);
        case types.DESTROY_TOPIC:
            return state.filter(t => t.id !== action.id);
        case types.RATING_USER:
            return state.map(t => cours(t, action));
        default:
            return state;
    }
};


// 'newCoursValue' sera la propriété dans l'objet state
const newCoursValue = (state = '', action) => {
    switch (action.type) {
        case types.TYPING:                          // quand on est entrain d'ecrire
            return action.typingCurrentValue;                     // on retourne la valeur dans le state
        case types.CREATE_TOPIC_REQUEST:            // quand on valide le nouveau topic, on vide cette valeur du state
            return '';
        default:
            return state;
    }
};

const topicReducer = combineReducers({
    courses,
    newCoursValue
});

export default topicReducer;
