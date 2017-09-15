import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import User from './user';
import styles from '../../../../css/common/main-section';

const cx = classNames.bind(styles);


const UsersList = ({ usersList }) => {
    const usersNode = usersList.map((user, key) => {
        return (
            <User
                index={key}
                id={user._id}
                key={key}
                email={user.email}
								avatarMainSelected={user.avatarMainSelected}
								avatarsList={user.avatarsSrc}
            />
        );
    });

    return (
        <div className={cx('main-section')}>
            <ul className={cx('list-users-container')}>
                {usersNode}
            </ul>
        </div>
    );
};


UsersList.propTypes = {
    usersList: PropTypes.array.isRequired
};

export default UsersList;