const getGiphyApiKey = params =>
  Object.entries(params)
    .filter(([key]) => key.startsWith("REACT_APP_GIPHY_API_KEYS"))
    .map(key => key.value);

export default getGiphyApiKey;
