/** le reducer permet d'updater le 'state container' **/

/** action en params    => valeurs retourné dans les fichiers 'action' par un 'dispatch(...)'    exemple => return { type: types.TYPING, newTopic: text }; **/
/** state               => une partie du 'state container' défini dans "mapStateToProps" du composant => connect(mapStateToProps, ...) **/

import { combineReducers } from 'redux';
import * as types from 'types';

const topic = (state = {}, action) => {
    switch (action.type) {
        case types.CREATE_TOPIC_REQUEST:
            return {
                id: action.id,
                count: action.count,
                text: action.text
            };
        case types.INCREMENT_COUNT:
            if (state.id === action.id) {
                return {...state, count: state.count + 1};
            }
            return state;
        case types.DECREMENT_COUNT:
            if (state.id === action.id) {
                return {...state, count: state.count - 1};
            }
            return state;
        default:
            return state;
    }
};


const topics = (state = [], action) => {
    switch (action.type) {
        case types.REQUEST_SUCCESS:                                 // quand on charge la page, ou au changement d'url
            if (action.data) return action.data;
            return state;
        case types.CREATE_TOPIC_REQUEST:                            // quand on ajoute un nouveau topic
            return [...state, topic(undefined, action)];            // topic() va retourner un objet correpondant au nouveau topic
        case types.CREATE_TOPIC_FAILURE:                            // dans les actions, si CREATE_TOPIC_FAILURE est dispatché (à cause d'une rreur)
            return state.filter(t => t.id !== action.id);
        case types.DESTROY_TOPIC:
            return state.filter(t => t.id !== action.id);
        case types.INCREMENT_COUNT:
        case types.DECREMENT_COUNT:
            return state.map(t => topic(t, action));
        default:
            return state;
    }
};


// 'action.newTopic' permet de setter l'attribue html 'value' de l'input avant l'envoi :
const newTopic = (state = '', action) => {
    switch (action.type) {
        case types.TYPING:                          // quand on est entrain d'ecrire
            return action.newTopic;                     // on retourne la valeur dans le state
        case types.CREATE_TOPIC_REQUEST:            // quand on valide le nouveau topic, on vide cette valeur du state
            return '';
        default:
            return state;
    }
};

const topicReducer = combineReducers({
    topics,
    newTopic
});

export default topicReducer;
