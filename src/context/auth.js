import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { apiMethodsBasicAuth, apiMethodsGoogleAuth, apiMethodsFacebookAuth } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import routes from '../routes';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../util/handle-fetch';
import { withErrors } from './errors';
import config from '../config';

const ACCESS_TOKEN = 'access_token';

const AuthContext = createContext({});

const AuthProviderCmp = ({ startLoading, stopLoading, handleError, enqueueSnackbar, history, children }) => {
  const [tokenData, setTokenData] = useState(JSON.parse(Cookies.get(ACCESS_TOKEN) || null));
  const handleFetch = createHandleFetch({ startLoading, stopLoading, handleError });

  const setToken = token => {
    setTokenData(tokenData);
    Cookies.set(ACCESS_TOKEN, JSON.stringify(token), {
      expires: 1,
      path: config.publicUrl,
    });
  };

  const handleBasicLogIn = ({ email, password }) =>
    handleFetch({
      loadingName: loadingNames.auth.logIn,
      apiHandler: apiMethodsBasicAuth
        .logIn({ email, password })
        .then(setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });

  const handleBasicSignUp = ({ email, password }) =>
    handleFetch({
      loadingName: loadingNames.auth.signUp,
      apiHandler: apiMethodsBasicAuth.signUp({ email, password }).then(() => {
        history.push(routes.words.list);
        return enqueueSnackbar('Welcome! You have been signed up successfully', {
          variant: notificationType.success,
        });
      }),
    });

  const handleBasicForgotPassword = ({ email }) =>
    handleFetch({
      loadingName: loadingNames.auth.forgotPassword,
      apiHandler: apiMethodsBasicAuth.forgotPassword({ email }).then(() =>
        enqueueSnackbar('Password is sent! Check your email', {
          variant: notificationType.success,
        })
      ),
    });

  const handleGoogleLogIn = token =>
    handleFetch({
      loadingName: loadingNames.auth.logIn,
      apiHandler: apiMethodsGoogleAuth
        .logIn(token)
        .then(setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });

  const handleGoogleSignUp = token =>
    handleFetch({
      loadingName: loadingNames.auth.signUp,
      apiHandler: apiMethodsGoogleAuth
        .signUp(token)
        .then(setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });

  const handleFacebookLogIn = token =>
    handleFetch({
      loadingName: loadingNames.auth.logIn,
      apiHandler: apiMethodsFacebookAuth
        .logIn(token)
        .then(setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });

  const handleFacebookSignUp = token =>
    handleFetch({
      loadingName: loadingNames.auth.signUp,
      apiHandler: apiMethodsFacebookAuth
        .signUp(token)
        .then(setToken)
        .then(() => {
          history.push(routes.words.list);
          return enqueueSnackbar('Successfully authorized', {
            variant: notificationType.success,
          });
        }),
    });

  const handleLogout = () => {
    setTokenData(null);
    Cookies.remove(ACCESS_TOKEN);
    history.push(routes.auth.logIn);
    enqueueSnackbar('Successfully logged out', {
      variant: notificationType.success,
    });
  };

  const isLoggedIn = Boolean(tokenData && tokenData.expiresAt - Date.now() > 0);

  return (
    <AuthContext.Provider
      value={{
        tokenData,
        isLoggedIn,
        setToken,
        handleBasicLogIn,
        handleBasicSignUp,
        handleBasicForgotPassword,
        handleGoogleLogIn,
        handleGoogleSignUp,
        handleFacebookLogIn,
        handleFacebookSignUp,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const AuthProvider = compose(
  withRouter,
  withLoadingNames,
  withSnackbar,
  withErrors
)(AuthProviderCmp);

const withAuth = Cmp => props => <AuthContext.Consumer>{value => <Cmp {...value} {...props} />}</AuthContext.Consumer>;

export { AuthProvider, withAuth };
