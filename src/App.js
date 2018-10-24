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
import { CommandList, CommandEdit, CommandIcon } from "./commands";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductIcon
} from "./products";
import { CategoryList, CategoryEdit, CategoryIcon } from "./categories";
import { ReviewList, ReviewEdit, ReviewIcon } from "./reviews";

// import offlineDataProvider from "./dataProvider";
// import dataProviderFactory from "./dataProvider";
import fakeDataProvider from "ra-data-fakerest";

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

    // if (process.env.REACT_APP_DATA_PROVIDER === "offline") {
    //   const dataProvider = offlineDataProvider;

    //   this.setState({ dataProvider });
    // }
    const dataProvider = fakeDataProvider({
      users: [
        {
          userid: 0,
          userinfo: "dddddd",
          username: "zdy",
          createdate: "2018/09/09 10:00:00",
          roles: ["sysAdmin"],
          remarks: "无"
        },
        {
          userid: 1,
          username: "swc",
          createdate: "2018/09/09 10:00:00",
          roles: ["sysAdmin", "apiAdmin"]
        }
      ],
      apps: [
        {
          appid: 0,
          appname: "dddddd",
          appstatus: "大的",
          remarks: "无",
          apimanager: ["zdy"]
        },
        {
          appid: 1,
          appname: "swc",
          appstatus: "大的",
          remarks: "无",
          apimanager: ["zdy", "swc"]
        }
      ],
      commands: [{ id: 0, title: "Hello, world!" }],
      products: [{ id: 0, title: "Hello, world!" }],
      categories: [{ id: 0, title: "Hello, world!" }],
      reviews: [{ id: 0, title: "Hello, world!" }],
      posts: [{ id: 0, title: "Hello, world!" }, { id: 1, title: "FooBar" }],
      comments: [
        { id: 0, post_id: 0, author: "John Doe", body: "Sensational!" },
        { id: 1, post_id: 0, author: "Jane Doe", body: "I agree" }
      ]
    });
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
      </Admin>
    );
  }
}

export default App;
