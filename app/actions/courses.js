/** Les actions seront dispatché dans le store, ET si l'action est accompagné d'autres valeurs (id, text, filter), ces actions seront utilisées dans le reducer (pour mettre a jour le state) **/
/** Ici se feront les requetes vers l'API (via axios) **/

import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

/**
 * Utility function to make AJAX requests using isomorphic fetch.
 * Note: this function relies on an external variable `API_ENDPOINT` and isn't a pure function
 * @param {String} method - HTTP method (post, get, put, delete)
 * @param {Object} id - id
 * @param {Object} data - Data you wish to pass to the server
 * @param {String} api - endpoint
 * @return {Promise}
 **/
export function makeCoursRequest(method, id, data, api = '/api/cours') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}


/***************************************** Create cours - typing text value ********************************************/
export function typingCreateCourAction(text) {
    return {
        type: types.TYPING_CREATE_COUR_ACTION,
        typingCurrentValue: text
    };
}


/***************************************** Create cours ********************************************/
export function createCoursSuccess(data) {
    return {
        type: types.CREATE_COURS_SUCCESS,
        id: data.id,
        count: data.count,
        text: data.text,
        isVoted: data.isVoted
    };
}

export function createCoursFailure(data) {
    return {
        type: types.CREATE_COURS_FAILURE,
        id: data.id,
        error: data.error
    };
}

export function createCoursDuplicate() {
    return {
        type: types.CREATE_COURS_DUPLICATE
    };
}

// Ce créateur d'action renvoie une fonction, qui sera exécuté par le middleware Redux-Thunk - Cette fonction n'a pas besoin d'être pure et donc autorise l'exécution d'appels API asynchrones.
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

        // if cours duplicate :
        if (cours.courses.filter(coursItem => coursItem.id === id).length > 0) {
            return dispatch(createCoursDuplicate());
        }

        // request :
        return makeCoursRequest('post', id, data)
            .then(res => {
                if (res.status === 200) return dispatch(createCoursSuccess(data));
            })
            .catch(() => {
                return dispatch(createCoursFailure({
                    id,
                    error: 'Oops! Something went wrong and we couldn\'t create your cours'
                }));
            });
    };
}


/***************************************** Destroy cours ********************************************/
export function destroySuccess(id) {
    return {
        type: types.DESTROY_COURS_SUCCESS,
        id
    };
}

export function destroyFailure(data) {
    return {
        type: types.DESTROY_COURS_FAILURE,
        id: data.id,
        error: data.error
    };
}


export function destroyCours(id) {
    return dispatch => {
        return makeCoursRequest('delete', id)
            .then(() => dispatch(destroySuccess(id)))
            .catch(() => dispatch(destroyFailure({
                id,
                error: 'Oops! Something went wrong and we couldn\'t add your vote'
            })));
    };
}


/***************************************** Voting stars ********************************************/
export function addStarSuccess(id, count, isVoted) {
    return {
        type: types.RATING_COURS_SUCCESS,
        id,
        count,
        isVoted
    };
}

export function addStarFailure(data) {
    return {
        type: types.RATING_COURS_FAILURE,
        id: data.id,
        error: data.error
    };
}


export function addStarCourse(id, count, isVoted) {
    const data = {
        count: count,
        isVoted: isVoted
    };

    return dispatch => {
        return makeCoursRequest('put', id, data)
            .then(() => dispatch(addStarSuccess(id, count, isVoted)))
            .catch(() => dispatch(addStarFailure({
                id,
                error: 'Oops! Something went wrong and we couldn\'t add your vote'
            })));
    };
}
