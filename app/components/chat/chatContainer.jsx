import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { chatBoxOpenAction, receiveSocketAction } from '../../actions/chat';
import ChatHeader from './componantsChat/chatHeader';
import ChatMessages from './componantsChat/chatMessages';
import ChatInput from './componantsChat/chatInput';

import styles from './css/style';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


class ChatContainer extends Component {
	constructor(props) {
		super(props);
		this.handleClickCloseChatBox = this.handleClickCloseChatBox.bind(this);
	}

	componentDidMount() {
		const { socket, receiveSocketAction } = this.props;
		socket.emit('chatMounted');

		socket.on('receiveSocket', function (socketID) {
			receiveSocketAction(socketID);
		});
	}

	handleClickCloseChatBox() {
		const { chatBoxOpenAction } = this.props;
		chatBoxOpenAction(false);
	}

	render() {
		const { chatBoxOpenState } = this.props;

		return (
			<div className={cx('chatbox-container', {show: chatBoxOpenState})} >
					<ChatHeader title="Pierre" handleClickCloseChatBox={this.handleClickCloseChatBox} />
					<ChatMessages test="test" />
					<ChatInput />
			</div>
		);
	}
}

ChatContainer.propTypes = {
		chatBoxOpenAction: PropTypes.func,
		receiveSocketAction: PropTypes.func,
		chatBoxOpenState: PropTypes.bool,
		socket: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
			chatBoxOpenState: state.chat.chatBoxOpenState
		};
}

export default connect(mapStateToProps, { chatBoxOpenAction, receiveSocketAction })(ChatContainer);
