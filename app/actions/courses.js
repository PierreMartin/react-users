/** Les actions seront dispatché dans le store, ET si l'action est accompagné d'autres valeurs (id, text, filter), ces actions seront utilisées dans le reducer (pour mettre a jour le state) **/
/** Ici se feront les requetes vers l'API (via axios) **/

import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

/**
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 **/
export function makeCoursRequest(method, id, data, api = '/topic') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}


/***************************************** Fetch cours ********************************************/
/*export function fetchTopics() {
    return {
        type: types.GET_TOPICS,
        promise: makeCoursRequest('get')
    };
}*/



/***************************************** Create cours - typing text value ********************************************/
export function typing(text) {
    return {
        type: types.TYPING,
        typingCurrentValue: text
    };
}


/***************************************** Create cours ********************************************/
export function createTopicRequest(data) {
    return {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text,
        isVoted: data.isVoted
    };
}

export function createTopicSuccess() {
    return {
        type: types.CREATE_TOPIC_SUCCESS
    };
}

export function createTopicFailure(data) {
    return {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id,
        error: data.error
    };
}

export function createTopicDuplicate() {
    return {
        type: types.CREATE_TOPIC_DUPLICATE
    };
}

// Ce créateur d'action renvoie une fonction, qui sera exécuté par le middleware Redux-Thunk
// Cette fonction n'a pas besoin d'être pure et donc autorise l'exécution d'appels API asynchrones.
export function createCours(text) {
    return (dispatch, getState) => {
        // If the text box is empty
        if (text.trim().length <= 0) return;

        const id = md5.hash(text);
        // Redux thunk's middleware receives the store methods `dispatch` and `getState` as parameters
        const { cours } = getState();
        const data = {
            count: 0,
            id,
            text,
            isVoted: false
        };

        // Conditional dispatch
        // If the topic already exists, make sure we emit a dispatch event
        if (cours.courses.filter(coursItem => coursItem.id === id).length > 0) {
            // Currently there is no reducer that changes state for this
            // For production you would ideally have a message reducer that
            // notifies the user of a duplicate topic
            return dispatch(createTopicDuplicate());
        }

        // First dispatch an optimistic update
        dispatch(createTopicRequest(data));

        return makeCoursRequest('post', id, data)
            .then(res => {
                if (res.status === 200) {
                    // We can actually dispatch a CREATE_TOPIC_SUCCESS
                    // on success, but I've opted to leave that out
                    // since we already did an optimistic update
                    // We could return res.json();
                    return dispatch(createTopicSuccess());
                }
            })
            .catch(() => {
                return dispatch(createTopicFailure({
                    id,
                    error: 'Oops! Something went wrong and we couldn\'t create your cours'
                }));
            });
    };
}


/***************************************** Destroy cours ********************************************/
export function destroy(id) {
    return {type: types.DESTROY_TOPIC, id};
}

export function destroyCours(id) {
    return dispatch => {
        return makeCoursRequest('delete', id)
            .then(() => dispatch(destroy(id)))
            .catch(() => dispatch(createTopicFailure({
                id,
                error: 'Oops! Something went wrong and we couldn\'t add your vote'
            })));
    };
}


/***************************************** Voting stars ********************************************/
export function voteStars(id, count, isVoted) {
    return {
        type: types.RATING_USER,
        id,
        count,
        isVoted
    };
}


export function addStarCourse(id, count, isVoted) {
    const data = {
        count: count,
        isVoted: isVoted
    };

    return dispatch => {
        return makeCoursRequest('put', id, data)
            .then(() => dispatch(voteStars(id, count, isVoted)))
            .catch(() => dispatch(createTopicFailure({
                id,
                error: 'Oops! Something went wrong and we couldn\'t add your vote'
            })));
    };
}
