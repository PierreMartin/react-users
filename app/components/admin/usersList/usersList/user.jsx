import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from './css/user';
import avatar from '../../../../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const User = ({ id, email }) => {
    return (
        <li className={cx('user-container')} key={id}>
            <Link to={'/user/' + id} className={cx('user-links')}>
                <figure>
                    <img src={avatar} alt="" className={cx('img-item')}/>
                    <figcaption>
                        <span className={cx('topic')}>{email}</span>
                    </figcaption>
                </figure>
            </Link>
        </li>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default User;
