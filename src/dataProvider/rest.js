import simpleRestProvider from "ra-data-simple-rest";

const restProvider = simpleRestProvider("http://172.30.201.83:8080/esb");
export default (type, resource, params) =>
  new Promise(resolve =>
    setTimeout(() => resolve(restProvider(type, resource, params)), 500)
  );
