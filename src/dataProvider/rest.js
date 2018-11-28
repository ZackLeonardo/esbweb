import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const restProvider = simpleRestProvider(
  "http://172.30.201.71:8080/esb",
  httpClient
);
export default (type, resource, params) =>
  new Promise(resolve =>
    setTimeout(() => resolve(restProvider(type, resource, params)), 500)
  );
