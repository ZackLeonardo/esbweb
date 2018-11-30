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

class Configuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }

  changePasswd = () => {
    if (this.state.newPasswd1 !== this.state.newPasswd2) {
      this.setState({
        error: "两次密码不一致"
      });
    } else {
      let password = this.state.oldPasswd;
      let newpassword = this.state.newPasswd1;
      const request = new Request(
        "http://esb.dpm.org.cn:8080/esb/updatepassword",
        {
          method: "POST",
          body: JSON.stringify({ password, newpassword }),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          })
        }
      );
      fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.error);
          }
          let test = response.json();
          return test;
        })
        .then(({ status, error, token, role }) => {
          if (status !== "ok") {
            console.log("responese error");
            this.setState({
              error: "修改失败"
            });
          } else {
            console.log("responese ok");
            this.setState({
              error: "修改成功"
            });
          }
        });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, locale, changeLocale, translate } = this.props;
    return (
      <Card>
        <Title title={translate("pos.configuration")} />
        <CardContent>
          <div className={classes.label}>原密码</div>
          <Input
            className={classes.button}
            onChange={this.handleChange("oldPasswd")}
          />
        </CardContent>
        <CardContent>
          <div className={classes.label}>新密码</div>
          <Input
            className={classes.button}
            onChange={this.handleChange("newPasswd1")}
          />
        </CardContent>
        <CardContent>
          <div className={classes.label}>新密码确认</div>
          <Input
            className={classes.button}
            onChange={this.handleChange("newPasswd2")}
          />
          <div style={{ color: "red" }} className={classes.label}>
            {this.state.error}
          </div>
        </CardContent>
        <CardContent>
          <Button
            variant="raised"
            color={"primary"}
            onClick={this.changePasswd}
          >
            确定
          </Button>
        </CardContent>
      </Card>
    );
  }
}

// return (
//   <Card>
//     <Title title={translate("pos.configuration")} />
//     <CardContent>
//       <div className={classes.label}>原密码</div>
//       <Input className={classes.button} ref="oldPasswd" />
//     </CardContent>
//     <CardContent>
//       <div className={classes.label}>新密码</div>
//       <Input className={classes.button} ref="newPasswd1" />
//     </CardContent>
//     <CardContent>
//       <div className={classes.label}>新密码确认</div>
//       <Input className={classes.button} ref="newPasswd2" />
//     </CardContent>
//     <CardContent>
//       <Button variant="raised" color={"primary"} onClick={this.changePasswd}>
//         确定
//       </Button>
//     </CardContent>
//   </Card>
// );
// };

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
