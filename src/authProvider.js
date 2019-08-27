import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS
} from "react-admin";
import md5 from "./md5";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    let { username, password } = params;
    const request = new Request("http://esbbak.dpm.org.cn:8080/esb/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: md5(password) }),
      headers: new Headers({ "Content-Type": "application/json" })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.error);
          // return Promise.reject(response.error);
        }
        let test = response.json();
        return test;
      })
      .then(({ status, error, token, role }) => {
        if (status !== "ok") {
          return Promise.reject(error);
        } else {
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
        }
      });
    // return Promise.resolve();
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  }
  return Promise.reject("Unkown method");
};
