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
