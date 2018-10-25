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
import { Dashboard } from "./dashboard";
import customRoutes from "./routes";
import chineseMessages from "./i18n/zh";

import { UserList, UserEdit, UserCreate, UserIcon } from "./users";
import { AppList, AppEdit, AppCreate, AppIcon } from "./apps";
// import { ApiList, ApiEdit, ApiCreate, ApiIcon } from "./apis";

import { CommandList, CommandEdit, CommandIcon } from "./commands";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductIcon
} from "./products";
import { CategoryList, CategoryEdit, CategoryIcon } from "./categories";
import { ReviewList, ReviewEdit, ReviewIcon } from "./reviews";

import dataProviderFactory from "./dataProvider";
import fakeDataProvider from "ra-data-fakerest";
import simpleRestProvider from "ra-data-simple-rest";

const i18nProvider = locale => {
  if (locale === "fr") {
    return import("./i18n/fr").then(messages => messages.default);
  }

  if (locale === "en") {
    return import("./i18n/en").then(messages => messages.default);
  }

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

  componentWillUnmount() {
    this.restoreFetch();
  }

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
        <Resource
          name="users"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          icon={UserIcon}
        />
        <Resource name="apps" list={AppList} edit={AppEdit} icon={AppIcon} />
        {/* <Resource name="apis" list={ApiList} edit={ApiEdit} icon={ApiIcon} /> */}
      </Admin>
    );
  }
}

export default App;
