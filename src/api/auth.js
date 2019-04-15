import { joinPath } from 'url-joiner';
import requests from './request';
import createFetcherJson from './create-fetcher';
import { createAuthProxy } from './proxies';
import config from '../config';
import apiRoutes from './routes';

const createApiMethodsBasicAuth = endpoint => fetcher => ({
  logIn: body => fetcher(requests.post(joinPath(endpoint, apiRoutes.auth.basic.logIn), { body })),
  signUp: body => fetcher(requests.post(joinPath(endpoint, apiRoutes.auth.basic.signUp), { body })),
});

const createApiMethodsGoogleAuth = endpoint => fetcher => ({
  logIn: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.google.logIn)), token),
  signUp: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.google.signUp)), token),
});

const createApiMethodsFacebookAuth = endpoint => fetcher => ({
  logIn: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.facebook.logIn)), token),
  signUp: token => fetcher(requests.get(joinPath(endpoint, apiRoutes.auth.facebook.signUp)), token),
});

const apiMethodsBasicAuth = createApiMethodsBasicAuth(config.endpoints.auth)(createFetcherJson(window.fetch));
const apiMethodsGoogleAuth = createApiMethodsGoogleAuth(config.endpoints.auth)(
  createAuthProxy(createFetcherJson(window.fetch))
);
const apiMethodsFacebookAuth = createApiMethodsFacebookAuth(config.endpoints.auth)(
  createAuthProxy(createFetcherJson(window.fetch))
);

export {
  createApiMethodsBasicAuth,
  createApiMethodsGoogleAuth,
  createApiMethodsFacebookAuth,
  apiMethodsBasicAuth,
  apiMethodsGoogleAuth,
  apiMethodsFacebookAuth,
};
