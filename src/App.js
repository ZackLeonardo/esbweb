import "babel-polyfill";
import React, { Component } from "react";
import { Admin, Resource } from "react-admin";

import "./App.css";

import authProvider from "./authProvider";
import sagas from "./sagas";
import themeReducer from "./themeReducer";
import Login from "./Login";
import Layout from "./Layout";
import Menu from "./Menu";
// import { Dashboard } from "./dashboard";
import customRoutes from "./routes";
import chineseMessages from "./i18n/zh";

import { UserList, UserEdit, UserCreate, UserIcon } from "./users";
import { AppList, AppEdit, AppIcon } from "./apps";
import { StoreList, StoreShow, StoreIcon } from "./store";

import { ApiList, ApiEdit, ApiCreate, ApiIcon, ApiShow } from "./apis";
import { SubList, SubEdit, SubCreate, SubIcon } from "./subs";
import { LogList, LogIcon, LogShow } from "./logs";
import { ErrorList, ErrorIcon } from "./errors";

import dataProviderFactory from "./dataProvider";

const i18nProvider = locale => {
  // if (locale === "fr") {
  //   return import("./i18n/fr").then(messages => messages.default);
  // }

  // if (locale === "en") {
  //   return import("./i18n/en").then(messages => messages.default);
  // }

  // Always fallback on english
  return chineseMessages;
};

class App extends Component {
  state = { dataProvider: null };

  async componentWillMount() {
    const dataProvider = await dataProviderFactory(
      process.env.REACT_APP_DATA_PROVIDER
    );

    this.setState({ dataProvider });
  }

  // componentWillUnmount() {
  //   this.restoreFetch();
  // }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">加载中...</div>
        </div>
      );
    }

    return (
      <Admin
        title="故宫服务集成平台"
        dataProvider={dataProvider}
        customReducers={{ theme: themeReducer }}
        customSagas={sagas}
        customRoutes={customRoutes}
        authProvider={authProvider}
        loginPage={Login}
        appLayout={Layout}
        menu={Menu}
        locale="zh"
        i18nProvider={i18nProvider}
      >
        {permissions => {
          console.log("permissions");
          console.log(permissions);

          return [
            permissions.indexOf("sysAdmin") > -1 ? (
              <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                icon={UserIcon}
              />
            ) : null,
            <Resource
              name="apps"
              list={AppList}
              edit={AppEdit}
              icon={AppIcon}
            />,
            <Resource
              name="store"
              list={StoreList}
              icon={StoreIcon}
              show={StoreShow}
            />,
            <Resource
              name="apis"
              list={ApiList}
              edit={ApiEdit}
              create={ApiCreate}
              icon={ApiIcon}
              show={ApiShow}
            />,
            <Resource
              name="subs"
              list={SubList}
              edit={SubEdit}
              create={SubCreate}
              icon={SubIcon}
            />,
            <Resource
              name="logs"
              list={LogList}
              show={LogShow}
              icon={LogIcon}
            />,
            <Resource name="errors" list={ErrorList} icon={ErrorIcon} />
          ];
        }}
      </Admin>
    );
  }
}

export default App;
