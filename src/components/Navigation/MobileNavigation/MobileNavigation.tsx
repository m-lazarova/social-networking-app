import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import './MobileNavigation.css';
import { Navigation } from '../../types';

const mobileNavigation: React.FC<Partial<Navigation>> = (props) => (
  <nav className={['mobile-nav', props.open ? 'open' : ''].join(' ')}>
    <ul
      className={['mobile-nav__items', props.mobile ? 'mobile' : ''].join(' ')}
    >
      <NavigationItems
        mobile
        onChoose={props.onChoose}
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </ul>
  </nav>
);

export default mobileNavigation;
