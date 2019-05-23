import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Fade } from '@material-ui/core';
import { Switch, Route, withRouter } from 'react-router-dom';
import LogOutContainer from './log-out';
import { LogInSuggestion, SignUpSuggestion, LogInForm, SignUpForm, ForgotPasswordForm } from '../../chunks';
import routes from '../../routes';
import SC from './styles';

const SLIDING_TIME = 500;

const AuthPage = ({ location }) => {
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    setIsSliding(true);
    setTimeout(() => {
      setIsSliding(false);
    }, SLIDING_TIME);
  }, [location.pathname]);

  const isLeftActive = [routes.auth.logIn].includes(location.pathname);
  const isRightActive = [routes.auth.signUp, routes.auth.forgotPassword].includes(location.pathname);

  return (
    <Switch>
      <Route path={routes.auth.logOut} component={LogOutContainer} />
      <SC.Outer>
        <SC.Background isLeft={isLeftActive} transitionDelay={SLIDING_TIME} />
        <SC.Circle transitionDelay={SLIDING_TIME} isLeft={isLeftActive} />
        <SC.HalfPart isActive={isLeftActive}>
          {!isSliding && (
            <Fade in={!isSliding}>
              <Switch>
                <Route path={routes.auth.logIn} component={LogInForm} />
                <Route path={routes.auth.signUp} component={LogInSuggestion} />
                <Route path={routes.auth.forgotPassword} component={LogInSuggestion} />
              </Switch>
            </Fade>
          )}
        </SC.HalfPart>
        <SC.HalfPart isActive={isRightActive}>
          {!isSliding && (
            <Fade in={!isSliding}>
              <Switch>
                <Route path={routes.auth.logIn} component={SignUpSuggestion} />
                <Route path={routes.auth.signUp} component={SignUpForm} />
                <Route path={routes.auth.forgotPassword} component={ForgotPasswordForm} />
              </Switch>
            </Fade>
          )}
        </SC.HalfPart>
      </SC.Outer>
    </Switch>
  );
};

AuthPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default withRouter(AuthPage);
