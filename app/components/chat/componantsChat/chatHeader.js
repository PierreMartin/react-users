import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from '../css/style';
const cx = classNames.bind(styles);


const ChatHeader = ({ test }) => {
	return (
		<div className={cx('test')}>
			{test}
		</div>
	);
};


ChatHeader.propTypes = {
	test: PropTypes.string
};

export default ChatHeader;