import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, Input } from "@material-ui/core";
import { translate, changeLocale, Title } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { changeTheme } from "./actions";

const styles = {
  label: { width: "10em", display: "inline-block" },
  button: { margin: "1em" }
};

const Configuration = ({ classes, locale, changeLocale, translate }) => (
  <Card>
    <Title title={translate("pos.configuration")} />
    <CardContent>
      <div className={classes.label}>原密码</div>
      <Input className={classes.button} />
    </CardContent>
    <CardContent>
      <div className={classes.label}>新密码</div>
      <Input className={classes.button} />
    </CardContent>
    <CardContent>
      <div className={classes.label}>新密码确认</div>
      <Input className={classes.button} />
    </CardContent>
    <CardContent>
      <Button
        variant="raised"
        color={"primary"}
        onClick={() => changeLocale("en")}
      >
        确定
      </Button>
    </CardContent>
  </Card>
);

const mapStateToProps = state => ({
  theme: state.theme,
  locale: state.i18n.locale
});

export default compose(
  connect(
    mapStateToProps,
    {
      changeLocale,
      changeTheme
    }
  ),
  translate,
  withStyles(styles)
)(Configuration);
