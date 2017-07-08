import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './css/user';
import avatar from '../../../../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const User = ({ userSingle }) => {
    return (
        <div>
            <img src={avatar} alt="" className={cx('img-item')}/>
            <div><strong>Email : {userSingle.email}</strong></div>
            <div>prénom : {userSingle.firstName}</div>
            <div>Nom : {userSingle.lastName}</div>
            <div>genre : {userSingle.gender}</div>
            <div>Image : {userSingle.picture}</div>
        </div>
    );
};

User.propTypes = {
		userSingle: PropTypes.object
};

export default User;
