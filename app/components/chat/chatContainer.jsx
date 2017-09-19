import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { chatBoxOpenAction } from '../../actions/chat';
import { ChatHeader } from './componantsChat/chatHeader';
import { ChatMessages } from './componantsChat/chatMessages';
import { ChatInput } from './componantsChat/chatInput';

import styles from './css/style';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


class ChatContainer extends Component {
	constructor(props) {
		super(props);
		this.handleClickCloseChatBox = this.handleClickCloseChatBox.bind(this);
	}

	handleClickCloseChatBox() {
		const { chatBoxOpenAction } = this.props;
		chatBoxOpenAction(false);
	}

	render() {
		const { chatBoxOpenState } = this.props;

		return (
			<div className={cx('chatbox-container', {show: chatBoxOpenState})} onClick={this.handleClickCloseChatBox}>
					{/*
					<ChatHeader test="test" />
					<ChatMessages test="test"  />
					<ChatInput test="test" />
					*/}
			</div>
		);
	}
}

ChatContainer.propTypes = {
		chatBoxOpenAction: PropTypes.func,
		chatBoxOpenState: PropTypes.boolean
};

function mapStateToProps(state) {
    return {
			chatBoxOpenState: state.chat.chatBoxOpenState
		};
}

export default connect(mapStateToProps, { chatBoxOpenAction })(ChatContainer);