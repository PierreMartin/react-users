import React, { PropTypes } from 'react';
import Navigation from '../components/navigation/mainMenu/mainMenu';
import Message from '../components/message/component';
import Chat from '../components/chat/chatContainer';
import io from 'socket.io-client';
const socket = io('', { path: '/api/chat' });

import classNames from 'classnames/bind';
import styles from '../css/main';
const cx = classNames.bind(styles);


const App = ({children}) => {
    return (
        <div className={cx('app')}>
            <Navigation />
            <Message />
            <Chat socket={socket} />
            {children}
        </div>
    );
};

App.propTypes = {
    children: PropTypes.object
};

export default App;
