import React from "react";
import { AppBar, UserMenu, MenuItemLink, translate } from "react-admin";
// import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// import AppBar from "../node_modules/ra-ui-materialui/src/layout/AppBar";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";

import Logored from "./icons/logo.png";

const styles = {
  title: {
    flex: 0.8,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  logo: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: 22
  },
  spacer: {
    flex: 1
  }
};

const CustomUserMenu = translate(({ translate, ...props }) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/configuration"
      primaryText={translate("pos.configuration")}
      leftIcon={<SettingsIcon />}
    />
  </UserMenu>
));

const CustomAppBar = ({ classes, ...props }) => (
  <AppBar {...props} userMenu={<CustomUserMenu />}>
    <Typography
      variant="title"
      color="inherit"
      className={classes.title}
      id="react-admin-title"
    />
    <img src={Logored} height="22" style={{ marginRight: 5 }} />
    <span className={classes.logo}>故宫服务集成平台</span>
  </AppBar>
  // <AppBar {...props} userMenu={<CustomUserMenu />} />
);

// export default CustomAppBar;
export default withStyles(styles)(CustomAppBar);
