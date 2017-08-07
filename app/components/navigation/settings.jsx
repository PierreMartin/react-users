import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from './css/settings';
const cx = classNames.bind(styles);

export const NavigationSetting = ({userAuth}) => {
  return (
    <div>

      <nav className={cx('setting-nav')} role="navigation">
        <ul>
          <li><Link to={'/settings/profil/' + userAuth.userObj._id} >Paramètres du profil</Link></li>
          <li><Link to={'/settings/acount/' + userAuth.userObj._id} >Paramètres du compte</Link></li>
        </ul>
      </nav>

    </div>
  );
};
