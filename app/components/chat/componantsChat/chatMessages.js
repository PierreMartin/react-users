import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/style';
const cx = classNames.bind(styles);


const renderItemsMessage = () => {
	let nodeItemsMessages = [];
	const numberItems = 20;

	for (var i = 1; i <= numberItems; i++) {
		nodeItemsMessages.push(
			<div className={cx('message-content', 'received')} key={i}>
				<div className={cx('message-avatar')}></div>
				<div className={cx('message-text')}>Lorem ipsum dolor sit amet.</div>
			</div>
		);
	}

	return nodeItemsMessages;
};

const ChatMessages = ({ test }) => {
	return (
		<div className={cx('chatbox-messages-container')}  >

			{renderItemsMessage()}

			<div className={cx('message-content', 'sent')} >
				<div className={cx('message-text')}>Hello !</div>
				<div className={cx('message-avatar')}></div>
			</div>

			<div className={cx('message-content', 'sent')} >
				<div className={cx('message-text')}>Hello ! Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</div>
				<div className={cx('message-avatar')}></div>
			</div>

		</div>
	);
};


ChatMessages.propTypes = {
	test: PropTypes.string
};

export default ChatMessages;