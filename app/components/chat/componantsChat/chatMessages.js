import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/style';
const cx = classNames.bind(styles);


const ChatMessages = ({ test }) => {
	return (
		<div className={cx('test')}>
			{test}
		</div>
	);
};


ChatMessages.propTypes = {
	test: PropTypes.string
};

export default ChatMessages;