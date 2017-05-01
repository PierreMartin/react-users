import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './css/user';
import avatar from '../../../../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const User = ({ id, name, gender }) => {
    return (
        <li className={cx('user-container')} key={id}>
            <a href="#" className={cx('user-links')}>
                <figure>
                    <img src={avatar} alt="" className={cx('img-item')}/>
                    <figcaption>
                        <span className={cx('topic')}>{name}</span>
                        <br/>
                        <span className={cx('topic')}>{gender}</span>
                    </figcaption>
                </figure>
            </a>
        </li>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
};

export default User;
