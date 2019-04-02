import React from 'react';
import PropTypes from 'prop-types';
import { ButtonMenu } from '..';
import SC from './styles';
import routes from '../../routes';

const buttonsData = {
  signIn: {
    href: routes.auth.logIn,
    text: 'Sign in',
  },
  signOut: {
    href: routes.auth.logOut,
    text: 'Sign out',
  },
};

const Header = ({ isLoggedIn }) => {
  const authButtonData = isLoggedIn ? buttonsData.signOut : buttonsData.signIn;

  return (
    <SC.Header>
      <SC.HeaderLink to={routes.root}>
        <SC.LogoSvg />
      </SC.HeaderLink>
      <SC.MenuDivider>
        <ButtonMenu to={routes.words.list}>My words</ButtonMenu>
        <ButtonMenu variant="outlined" to={authButtonData.href}>
          {authButtonData.text}
        </ButtonMenu>
      </SC.MenuDivider>
    </SC.Header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
