import { joinUrl } from "../helpers/join-url";
import requests from "./request";
import createFetcherJson from "./create-fetcher";
import { createGoogleAuthProxy } from "./proxies";

const { REACT_APP_ENDPOINT_USERS } = process.env;

export const createApiMethodsUsers = endpoint => fetcher => ({
  create: (body, tokens) => fetcher(requests.post(endpoint, { body }), tokens),
  get: (id, tokens) =>
    fetcher(requests.get(joinUrl({ url: endpoint, paths: [id] })), tokens),
  update: (data, tokens) =>
    fetcher(requests.put(joinUrl({ url: endpoint, paths: [data._id] }), { body: data }), tokens),
  delete: (id, tokens) =>
    fetcher(requests.delete(joinUrl({ url: endpoint, paths: [id] })), tokens),
});

const apiMethodsUsers = createApiMethodsUsers(REACT_APP_ENDPOINT_USERS)(
  createGoogleAuthProxy(createFetcherJson(window.fetch))
);

export default apiMethodsUsers;
