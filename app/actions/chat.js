import { polyfill } from 'es6-promise';
// import {  } from './../fetch-data';
import * as types from 'types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

/***************************************** CHAT ********************************************/
export function chatBoxOpenAction(isOpen) {
	return {
		type: types.CHATBOX_MODAL_ISOPEN_ACTION,
		isOpen
	};
}

export function receiveSocketAction(datas) {
	return {
		type: types.RECEIVE_SOCKET,
		datas
	};
}

// sert normalement à rien par la suite car le BE utilisera receiveNewMessageAction() mais utile pour update le componant react ?
export function createNewMessageAction(message) {
	return {
		type: types.CREATE_NEW_MESSAGE,
		message
	};
}

export function receiveNewMessageAction(message) {
	return {
		type: types.RECEIVE_NEW_MESSAGE,
		message
	};
}