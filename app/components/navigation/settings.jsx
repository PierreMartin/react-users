import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from './css/style';
const cx = classNames.bind(styles);

export const NavigationSetting = () => {
  return (
    <nav role="navigation">
      <ul>
        <li><Link to="/settings/profil">Paramètres du profil</Link></li>
        <li><Link to="/settings/acount">Paramètres du compte</Link></li>
      </ul>
    </nav>
  );
};
