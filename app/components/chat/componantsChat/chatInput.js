import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/style';
const cx = classNames.bind(styles);


const ChatInput = () => {
	return (
		<div className={cx('chatbox-input-container')}>
			<input type="text"/>
		</div>
	);
};


ChatInput.propTypes = {
	test: PropTypes.string
};

export default ChatInput;