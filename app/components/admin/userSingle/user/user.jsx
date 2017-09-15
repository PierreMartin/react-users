import React, { PropTypes } from 'react';
import { getAvatarById, fileExists } from '../../../../../toolbox/toolbox';

import classNames from 'classnames/bind';
import styles from './css/user';
const cx = classNames.bind(styles);


const User = ({ userSingle, userObj }) => {
		const avatarMainSelected = userObj.avatarMainSelected;
		const avatarsList = userObj.avatarsSrc;

		const avatarsListNode = avatarsList.map((avatar, key) => {
				if (avatar.thumbnail1 && fileExists(`/uploads/${avatar.thumbnail1}`)) {
					return (
							<a href={`/uploads/${avatar.mainProfil}`} >
								<img src={`/uploads/${avatar.thumbnail1}`} alt="avatar" key={key} />
							</a>
					);
				}
		});

    return (
        <div>
						<img src={getAvatarById(avatarMainSelected, avatarsList) ? `/uploads/${getAvatarById(avatarMainSelected, avatarsList).mainProfil}` : ''} alt="avatar" />
						<h3>A propos</h3>
						<div>
								<div><strong>Email : {userSingle.email}</strong></div>
								<div>prénom : {userSingle.firstName}</div>
								<div>Nom : {userSingle.lastName}</div>
								<div>genre : {userSingle.gender}</div>
								<div>Age : {userSingle.age}</div>
								<div>Ville : {userSingle.city}</div>
								<div>Pays : {userSingle.country}</div>
						</div>

						<div>
							<h3>Images</h3>
							<div className={cx('thumbnail-container')}>
								{avatarsListNode}
							</div>
						</div>
        </div>
    );
};

User.propTypes = {
		userSingle: PropTypes.object,
		userObj: PropTypes.object
};

export default User;
