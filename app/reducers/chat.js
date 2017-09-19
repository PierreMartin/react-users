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


const chatReducer = combineReducers({
	chatBoxOpenState,
});

export default chatReducer;
