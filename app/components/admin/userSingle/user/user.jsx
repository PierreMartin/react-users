import React, { PropTypes } from 'react';
import { getAvatarById } from '../../../../../toolbox/toolbox';

import classNames from 'classnames/bind';
import styles from './css/user';
const cx = classNames.bind(styles);


const User = ({ userSingle, userObj }) => {
		const avatarMainSelected = userObj.avatarMainSelected;
		const avatarsList = userObj.avatarsSrc;

    return (
        <div>
						<img src={getAvatarById(avatarMainSelected, avatarsList) ? `/uploads/${getAvatarById(avatarMainSelected, avatarsList).mainProfil}` : ''} alt="avatar" />
            <div><strong>Email : {userSingle.email}</strong></div>
            <div>prénom : {userSingle.firstName}</div>
            <div>Nom : {userSingle.lastName}</div>
            <div>genre : {userSingle.gender}</div>
            <div>Age : {userSingle.age}</div>
            <div>Ville : {userSingle.city}</div>
            <div>Pays : {userSingle.country}</div>
            <div>Avatar : {userSingle.avatar}</div>
        </div>
    );
};

User.propTypes = {
		userSingle: PropTypes.object,
		userObj: PropTypes.object
};

export default User;
