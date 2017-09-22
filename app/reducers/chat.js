import * as types from 'types';
import { combineReducers } from 'redux';

const chatBoxOpenState = (state = false, action) => {
	switch (action.type) {
		case types.CHATBOX_MODAL_ISOPEN_ACTION:
			return action.isOpen;
		default:
			return state;
	}
};

const socketID = (state = '', action) => {
	switch (action.type) {
		case types.RECEIVE_SOCKET:
			return action.datas.socketID;
		default:
			return state;
	}
};

const userName = (state = '', action) => {
	switch (action.type) {
		case types.RECEIVE_SOCKET:
			return action.datas.userName;
		default:
			return state;
	}
};


const chatReducer = combineReducers({
	chatBoxOpenState,
	socketID,
	userName
});

export default chatReducer;
