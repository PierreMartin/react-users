import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { chatBoxOpenAction, receiveSocketAction, createNewMessageAction, receiveNewMessageAction } from '../../actions/chat';
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
		this.getChannelByUserID 			= this.getChannelByUserID.bind(this);

		this.state = {
			text: '',
			typing: false
		};
	}

	/**
	 * Create a channel id from the usersnames
	 * @pram {string} currentUserID - the current user id
	 * @pram {string} targetedUserID - the target user id
	 * @return {string} A unique id of the channel
	 * */
	getChannelByUserID(currentUserID, targetedUserID) {
		return 'chann-' + currentUserID + "-" + targetedUserID;
	}

	componentDidMount() {
		const { socket, userObj, receiveSocketAction, receiveNewMessageAction } = this.props;

		socket.emit('login', userObj.firstName + '_' + userObj.lastName);

		// TODO remove it if all ok :
		/*
		socket.on('receiveSocket', function (datas) {
			receiveSocketAction(datas);
		});
		*/

		socket.on('new bc message', function (data) {
			debugger; // todo voir pk on passe pas ici... a cause du componentDidMount() ??
			if (data.text) {
				receiveNewMessageAction(data.text);
			}
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
			// socket.emit('typing', { user: userObj.username, channel: 'ezeze' });
			this.setState({ typing: true});
		}

		if (event.target.value.length === 0 && this.state.typing) {
			// socket.emit('stop typing', { user: userObj.username, channel: 'dsdssd' });
			this.setState({ typing: false});
		}
	}

	handleSubmitSendMessage(event) {
		const { socket, userObj, userSingle, createNewMessageAction } = this.props;

		if (event.which === 13) {
			event.preventDefault();

			const text = event.target.value.trim();
			const channelID = this.getChannelByUserID(userObj._id, userSingle._id);

			var data = {
				id: `${Date.now()}`,
				channelID: channelID,
				text: text,
				authorID: userObj._id,
				targetedUserID: userSingle._id
				// time: moment.utc().format('lll')
			};

			socket.emit('new message', data); // send to sockets
			createNewMessageAction(data.text); // send to state redux - for the re-render React
			// setCurrentChannelAction(channelID); // todo a faire au moment de cliquer sur 'contacter' handleClickOnUser ?
			this.setState({ text: '', typing: false });
		}
	}

	render() {
		const { chatBoxOpenState, newMessageState } = this.props;

		return (
			<div className={cx('chatbox-container', {show: chatBoxOpenState})} >
					<ChatHeader title="Pierre" handleClickCloseChatBox={this.handleClickCloseChatBox} />
					<ChatMessages newMessageState={newMessageState} />
					<ChatInput handleChangeSendMessage={this.handleChangeSendMessage} handleSubmitSendMessage={this.handleSubmitSendMessage} value={this.state.text} />
			</div>
		);
	}
}

ChatContainer.propTypes = {
		chatBoxOpenAction: PropTypes.func,
		receiveSocketAction: PropTypes.func,
		createNewMessageAction: PropTypes.func,
		receiveNewMessageAction: PropTypes.func,
		newMessageState: PropTypes.string,
		chatBoxOpenState: PropTypes.bool,
		userObj: PropTypes.object,
		userSingle: PropTypes.object,
		socket: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
			chatBoxOpenState: state.chat.chatBoxOpenState,
			newMessageState: state.chat.newMessage,
			userObj: state.userAuth.userObj,
			userSingle: state.user.userSingle
		};
}

export default connect(mapStateToProps, { chatBoxOpenAction, receiveSocketAction, createNewMessageAction, receiveNewMessageAction })(ChatContainer);
