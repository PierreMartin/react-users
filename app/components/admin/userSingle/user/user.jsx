import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './css/user';
import avatar from '../../../../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const User = ({ email, name, gender, picture }) => {
    return (
        <div>
            <img src={avatar} alt="" className={cx('img-item')}/>
            <div><strong>Email : {email}</strong></div>
            <div>Nom : {name}</div>
            <div>Sexe : {gender}</div>
            <div>Image : {picture}</div>
        </div>
    );
};

User.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    gender: PropTypes.string,
    picture: PropTypes.string
};

export default User;
