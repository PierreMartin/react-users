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
		this.handleClickCloseChatBox 	= this.handleClickCloseChatBox.bind(this);
		this.handleChangeSendMessage 	= this.handleChangeSendMessage.bind(this);
		this.handleSubmitSendMessage 	= this.handleSubmitSendMessage.bind(this);
		this.createChannelID 					= this.createChannelID.bind(this);

		this.state = {
			text: '',
			typing: false
		};
	}

	/**
	 * Create a channel id from the usersnames
	 * @pram {string} currentUserName - the current username
	 * @pram {string} targetedUserName - the target username
	 * @return {string} A unique id of the channel
	 * */
	createChannelID(currentUserName, targetedUserName) {
		return 'chann-' + currentUserName + "-" + targetedUserName;
	}

	componentDidMount() {
		const { socket, receiveSocketAction, user } = this.props;
		const userName = user.firstName + '_' + user.lastName; // TODO change here to unique userName

		socket.emit('login', userName);

		socket.on('receiveSocket', function (datas) {
			receiveSocketAction(datas);
		});

		socket.on('new bc message', function (newMessage) {
			console.log(newMessage);
			debugger;
			// newMessageAction(newMessage);
		});

	}

	handleClickCloseChatBox() {
		const { chatBoxOpenAction } = this.props;
		chatBoxOpenAction(false);
	}


	/******************** Handling send message : *********************/
		handleChangeSendMessage(event) {
		const { socket } = this.props;
		this.setState({ text: event.target.value });

		if (event.target.value.length > 0 && !this.state.typing) {
			// socket.emit('typing', { user: user.username, channel: 'ezeze' });
			this.setState({ typing: true});
		}

		if (event.target.value.length === 0 && this.state.typing) {
			// socket.emit('stop typing', { user: user.username, channel: 'dsdssd' });
			this.setState({ typing: false});
		}
	}

	handleSubmitSendMessage(event) {
		const { socket, user } = this.props;
		const userName = user.firstName + '_' + user.lastName; // TODO change here to unique userName
		const text = event.target.value.trim();
		const channelID = this.createChannelID(userName, 'Paul').trim();

		// setCurrentChannelAction(channelID); // TODO => send to store ??

		if (event.which === 13) {
			event.preventDefault();

			var newMessage = {
				id: `${Date.now()}`,
				channelID: channelID,
				text: text,
				user: userName,
				// time: moment.utc().format('lll')
			};

			socket.emit('new message', {
				newMessage,
				currentUserName: userName,
				targetedUserName: 'Paul'
			});

			/*
			var newMessage = {
				id: `${Date.now()}${uuid.v4()}`,
				channelID: this.props.activeChannel,
				text: text,
				user: user,
				// time: moment.utc().format('lll')
			};

			socket.emit('new message', newMessage);
			socket.emit('stop typing', { user: user.username, channel: activeChannel });
			this.props.onSave(newMessage);
			*/

			this.setState({ text: '', typing: false });
		}
	}

	render() {
		const { chatBoxOpenState } = this.props;

		return (
			<div className={cx('chatbox-container', {show: chatBoxOpenState})} >
					<ChatHeader title="Pierre" handleClickCloseChatBox={this.handleClickCloseChatBox} />
					<ChatMessages test="test" />
					<ChatInput handleChangeSendMessage={this.handleChangeSendMessage} handleSubmitSendMessage={this.handleSubmitSendMessage} value={this.state.text} />
			</div>
		);
	}
}

ChatContainer.propTypes = {
		chatBoxOpenAction: PropTypes.func,
		receiveSocketAction: PropTypes.func,
		chatBoxOpenState: PropTypes.bool,
		user: PropTypes.object,
		socket: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
			chatBoxOpenState: state.chat.chatBoxOpenState,
			user: state.userAuth.userObj
		};
}

export default connect(mapStateToProps, { chatBoxOpenAction, receiveSocketAction })(ChatContainer);
