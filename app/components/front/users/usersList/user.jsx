import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './css/user';
import avatar from '../../../../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const User = ({ id, email }) => {
    return (
        <li className={cx('user-container')} key={id}>
            <a href="#" className={cx('user-links')}>
                <figure>
                    <img src={avatar} alt="" className={cx('img-item')}/>
                    <figcaption>
                        <span className={cx('topic')}>{email}</span>
                    </figcaption>
                </figure>
            </a>
        </li>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default User;
