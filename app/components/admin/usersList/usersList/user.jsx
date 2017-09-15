import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getAvatarById } from '../../../../../toolbox/toolbox';

import classNames from 'classnames/bind';
import styles from './css/user';
const cx = classNames.bind(styles);


const User = ({ id, email, avatarMainSelected, avatarsList }) => {
    return (
        <li className={cx('user-container')} key={id}>
            <Link to={'/user/' + id} className={cx('user-links')}>
                <figure>
										<img src={getAvatarById(avatarMainSelected, avatarsList) ? `/uploads/${getAvatarById(avatarMainSelected, avatarsList).thumbnail1}` : ''} alt="avatar" />
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
    email: PropTypes.string.isRequired,
		avatarMainSelected: PropTypes.number.isRequired,
		avatarsList: PropTypes.object.isRequired
};

export default User;
