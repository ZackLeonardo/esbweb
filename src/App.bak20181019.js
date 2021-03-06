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

import {
  VisitorList,
  VisitorEdit,
  VisitorCreate,
  VisitorIcon
} from "./visitors";
import { CommandList, CommandEdit, CommandIcon } from "./commands";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductIcon
} from "./products";
import { CategoryList, CategoryEdit, CategoryIcon } from "./categories";
import { ReviewList, ReviewEdit, ReviewIcon } from "./reviews";

import offlineDataProvider from "./dataProvider";
// import dataProviderFactory from "./dataProvider";

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

  componentWillMount() {
    // this.restoreFetch = await fakeServerFactory(
    //     process.env.REACT_APP_DATA_PROVIDER
    // );

    if (process.env.REACT_APP_DATA_PROVIDER === "offline") {
      const dataProvider = offlineDataProvider;

      this.setState({ dataProvider });
    }
  }

  componentWillUnmount() {
    this.restoreFetch();
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
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
        dashboard={Dashboard}
        loginPage={Login}
        appLayout={Layout}
        menu={Menu}
        locale="zh"
        i18nProvider={i18nProvider}
      >
        <Resource
          name="customers"
          list={VisitorList}
          edit={VisitorEdit}
          create={VisitorCreate}
          icon={VisitorIcon}
        />
        <Resource
          name="commands"
          list={CommandList}
          edit={CommandEdit}
          icon={CommandIcon}
          options={{ label: "Orders" }}
        />
        <Resource
          name="products"
          list={ProductList}
          create={ProductCreate}
          edit={ProductEdit}
          icon={ProductIcon}
        />
        <Resource
          name="categories"
          list={CategoryList}
          edit={CategoryEdit}
          icon={CategoryIcon}
        />
        <Resource
          name="reviews"
          list={ReviewList}
          edit={ReviewEdit}
          icon={ReviewIcon}
        />
      </Admin>
    );
  }
}

export default App;
