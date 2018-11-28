import React, { createElement } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import SettingsIcon from "@material-ui/icons/Settings";
import LabelIcon from "@material-ui/icons/Label";
import {
  translate,
  DashboardMenuItem,
  MenuItemLink,
  Responsive,
  getResources,
  WithPermissions
} from "react-admin";
import { withRouter } from "react-router-dom";

import { UserIcon } from "./users";
import { AppIcon } from "./apps";
import { StoreIcon } from "./store";
import { ApiIcon } from "./apis";
import { LogIcon } from "./logs";
import { SubIcon } from "./subs";
import { ErrorIcon } from "./errors";

const items = [
  { name: "users", icon: <UserIcon /> },
  { name: "apps", icon: <AppIcon /> },
  { name: "store", icon: <StoreIcon /> },
  { name: "apis", icon: <ApiIcon /> },
  { name: "subs", icon: <SubIcon /> },
  { name: "logs", icon: <LogIcon /> },
  { name: "errors", icon: <ErrorIcon /> }
  //   { name: "commands", icon: <CommandIcon /> },
  //   { name: "products", icon: <ProductIcon /> },
  //   { name: "categories", icon: <CategoryIcon /> },
  //   { name: "reviews", icon: <ReviewIcon /> }
];

const Menu = ({ onMenuClick, translate, logout, resources }) => {
  return (
    <div>
      {/* <DashboardMenuItem onClick={onMenuClick} /> */}
      {resources.map(item => (
        <MenuItemLink
          key={item.name}
          to={`/${item.name}`}
          primaryText={translate(`resources.${item.name}.name`, {
            smart_count: 2
          })}
          leftIcon={createElement(item.icon)}
          onClick={onMenuClick}
        />
      ))}
      <Responsive
        xsmall={
          <MenuItemLink
            to="/configuration"
            primaryText={translate("pos.configuration")}
            leftIcon={<SettingsIcon />}
            onClick={onMenuClick}
          />
        }
        medium={null}
      />
      <Responsive xsmall={logout} medium={null} />
    </div>
  );
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      theme: state.theme,
      locale: state.i18n.locale,
      resources: getResources(state)
    }),
    {}
  ),
  translate
);

export default enhance(Menu);
