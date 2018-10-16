import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from "react-admin";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    // const { username, password } = params;
    // const request = new Request("https://mydomain.com/authenticate", {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: new Headers({ "Content-Type": "application/json" })
    // });
    // return fetch(request)
    //   .then(response => {
    //     if (response.status < 200 || response.status >= 300) {
    //       throw new Error(response.statusText);
    //     }
    //     return response.json();
    //   })
    //   .then(({ token }) => {
    //     localStorage.setItem("token", token);
    //   });
    const { username } = params;
    localStorage.setItem("username", username);
    // accept all username/password combinations
    return Promise.resolve();
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("username");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  }
  return Promise.reject("Unkown method");
};
