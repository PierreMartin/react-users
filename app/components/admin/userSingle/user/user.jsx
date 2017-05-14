import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './css/user';
import avatar from '../../../../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const User = ({ email }) => {
    return (
        <div>
            <img src={avatar} alt="" className={cx('img-item')}/>
            <div>
                <span className={cx('topic')}>{email}</span>
            </div>
        </div>
    );
};

User.propTypes = {
    email: PropTypes.string
};

export default User;
