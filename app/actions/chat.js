import { polyfill } from 'es6-promise';
// import {  } from './../fetch-data';
import * as types from 'types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

/****** Open / close chat box *******/
export function chatBoxOpenAction(isOpen) {
	return {
		type: types.CHATBOX_MODAL_ISOPEN_ACTION,
		isOpen
	};
}

/****** Create new channel *******/
export function createNewChannelAction(datas) {
	// + persister en base de donnée
	return {
		type: types.CREATE_NEW_CHANNEL,
		datas
	};
}

/*
export function receiveSocketAction(datas) {
	return {
		type: types.RECEIVE_SOCKET,
		datas
	};
}
*/

/****** Create new message *******/
export function createNewMessageAction(message) {
	return {
		type: types.CREATE_NEW_MESSAGE,
		message
	};
}

/****** Receive new message *******/
export function receiveNewMessageAction(message) {
	return {
		type: types.RECEIVE_NEW_MESSAGE,
		message
	};
}