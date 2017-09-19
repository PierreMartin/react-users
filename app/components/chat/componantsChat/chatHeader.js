import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/style';
const cx = classNames.bind(styles);


const ChatHeader = ({ title, handleClickCloseChatBox }) => {
	return (
		<div className={cx('chatbox-header-container')} >
			<div className={cx('chatbox-header-title')}>{title}</div>
			<div className={cx('chatbox-header-close')} onClick={handleClickCloseChatBox}>X</div>
		</div>
	);
};

ChatHeader.propTypes = {
	title: PropTypes.string,
	handleClickCloseChatBox: PropTypes.func
};


export default ChatHeader;