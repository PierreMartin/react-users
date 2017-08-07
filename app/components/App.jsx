import React, { PropTypes } from 'react';
import Navigation from '../components/navigation/mainMenu/mainMenu';
import Message from '../components/message/component';
import classNames from 'classnames/bind';
import styles from '../css/main';

const cx = classNames.bind(styles);


const App = ({children}) => {
    return (
        <div className={cx('app')}>
            <Navigation />
            <Message />
            {children}
        </div>
    );
};

App.propTypes = {
    children: PropTypes.object
};

export default App;
