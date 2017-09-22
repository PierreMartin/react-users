import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/style';
const cx = classNames.bind(styles);


const ChatInput = ({ handleChangeSendMessage, handleSubmitSendMessage, value }) => {
	return (
		<div className={cx('chatbox-input-container')}>
			<input
				type="text"
				onChange={handleChangeSendMessage}
				onKeyDown={handleSubmitSendMessage}
				value={value}
			/>
		</div>
	);
};


ChatInput.propTypes = {
	test: PropTypes.string
};

export default ChatInput;