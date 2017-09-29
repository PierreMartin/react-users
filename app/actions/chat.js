import { polyfill } from 'es6-promise';
import { createChannel } from './../fetch-data';
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


/****** CREATE channel *******/
export function createChannelError(message) {
	return {
		type: types.CREATE_NEW_CHANNEL_FAILURE,
		message
	};
}

export function createChannelSuccess(res) {
	return {
		type: types.CREATE_NEW_CHANNEL_SUCCESS,
		message: res.message,
		datas: res.newChannel
	};
}

export function createNewChannelAction(datas) {
	return dispatch => {
		return createChannel(datas)
			.then(response => {
				if (response.status === 200) {
					debugger;
					dispatch(createChannelSuccess(response.data));
				} else {
					dispatch(createChannelError(response.data.message));
				}
			})
			.catch(err => {
				dispatch(createChannelError(getMessage(err)));
			});
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