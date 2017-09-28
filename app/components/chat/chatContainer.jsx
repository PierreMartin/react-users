import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { chatBoxOpenAction, receiveSocketAction, createNewMessageAction, receiveNewMessageAction, createNewChannelAction } from '../../actions/chat';
import ChatHeader from './componantsChat/chatHeader';
import ChatMessages from './componantsChat/chatMessages';
import ChatInput from './componantsChat/chatInput';
import { getChannelByUserID } from '../../../toolbox/toolbox';

import styles from './css/style';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


class ChatContainer extends Component {
	constructor(props) {
		super(props);
		this.handleClickCloseChatBox 	= this.handleClickCloseChatBox.bind(this);
		this.handleChangeSendMessage 	= this.handleChangeSendMessage.bind(this);
		this.handleSubmitSendMessage 	= this.handleSubmitSendMessage.bind(this);

		this.state = {
			text: '',
			typing: false
		};
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
			console.log('#################### event from server !! ####################', data);
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
		const { socket, userObj, userSingle, createNewMessageAction, channelsList, createNewChannelAction } = this.props;

		if (event.which === 13) {
			event.preventDefault();

			const text = event.target.value.trim();
			let channelID = getChannelByUserID(userObj._id, userSingle._id, channelsList);

			// if the channel is not created, we create it :
			if (!channelID) {
				const channelObj = {
					id: 'chan-' + userSingle._id + '-' + userObj._id,
					between: [userSingle._id, userObj._id]
				};

				createNewChannelAction(channelObj);
				channelID = getChannelByUserID(userObj._id, userSingle._id, channelsList);
			}

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
		createNewChannelAction: PropTypes.func,
		createNewMessageAction: PropTypes.func,
		receiveNewMessageAction: PropTypes.func,
		newMessageState: PropTypes.string,
		channelsList: PropTypes.array,
		chatBoxOpenState: PropTypes.bool,
		userObj: PropTypes.object,
		userSingle: PropTypes.object,
		socket: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
			chatBoxOpenState: state.chat.chatBoxOpenState,
			newMessageState: state.chat.newMessage,
			channelsList: state.chat.channelsList,
			userObj: state.userAuth.userObj,
			userSingle: state.user.userSingle
		};
}

export default connect(mapStateToProps, { chatBoxOpenAction, receiveSocketAction, createNewMessageAction, receiveNewMessageAction, createNewChannelAction })(ChatContainer);
