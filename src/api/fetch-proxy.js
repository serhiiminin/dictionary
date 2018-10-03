import generatorApiKeys from '../helpers/generator-api-key';
import { updateSearchParamsInUrl } from '../helpers/search-params';
import { GIPHY_API_KEYS } from './credentials';
import { createFetcherJson } from './fetcher';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const fetcher = createFetcherJson(window.fetch);

const fetchProxy = (params, generator) =>
  fetcher(params)
    .then(checkStatus)
    .then(parseJson)
    .catch(error => {
      if (error.message === 'Failed to fetch') {
        if (!window.navigator.onLine) {
          throw new Error('Check your internet connection');
        }
      }
      throw error;
    })
    .catch(error => {
      const paramsWithNewApiKey = {
        ...params,
        endpoint: updateSearchParamsInUrl(
          params.endpoint,
          { api_key: generator.next().value}
        )
      }

      if (error.message === 'Failed to fetch') {
        return fetchProxy(paramsWithNewApiKey, generator)
      }
      throw error;
    })

const createApiKeyProxy = apiKeys => {
  const genGiphyKeyGenerator = generatorApiKeys(apiKeys);

  return params => fetchProxy(params, genGiphyKeyGenerator)
};

const apiKeyGiphyProxy = createApiKeyProxy(GIPHY_API_KEYS);

export { fetchProxy, apiKeyGiphyProxy };
