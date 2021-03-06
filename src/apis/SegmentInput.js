import React, { Component } from "react";
import { translate, SelectInput, TextInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import dataProviderFactory from "../dataProvider";

const styles = {
  input: { width: 150 }
};

class SegmentInput extends Component {
  state = {
    segments: [],
    showNamespace: false,
    showPostContentType: false
  };

  componentWillMount = () => {
    const { record, source } = this.props;
    if (
      source === "transfer" &&
      record["transfer"] === "webservice" &&
      record["namespace"]
    ) {
      this.setState({ showNamespace: true });
    }
    if (
      source === "requestmode" &&
      record["requestmode"] === "post" &&
      record["needParaWithData"] > -1
    ) {
      this.setState({ showPostContentType: true });
    }

    if (source === "transfer") {
      const segments = [
        { id: "http", name: "Http" },
        { id: "restful", name: "Restful Http" },
        { id: "webservice", name: "Webservice" }
      ];
      this.setState({ segments: segments });
    } else if (source === "cyclestatusid") {
      const segments = [{ id: "1", name: "启用" }, { id: "0", name: "停用" }];
      this.setState({ segments: segments });
    } else if (source === "requestmode") {
      const segments = [
        { id: "get", name: "get" },
        { id: "post", name: "post" },
        { id: "put", name: "put" },
        { id: "delete", name: "delete" }
      ];
      this.setState({ segments: segments });
    } else if (source.indexOf("required") >= 0) {
      const segments = [{ id: "是", name: "是" }, { id: "否", name: "否" }];
      this.setState({ segments: segments });
    } else {
      dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
        //process.env.REACT_APP_DATA_PROVIDER
        dataProvider => {
          dataProvider("GET_LIST", "apps", {
            filter: { status: "启用" },
            pagination: { page: 1, perPage: 9999 },
            sort: { field: "appid", order: "ASC" }
          })
            .then(response => response.data)
            .then(items =>
              items.map(item => {
                return { id: item.appid, name: item.appname };
              })
            )
            .then(segments => this.setState({ segments: segments }));
        }
      );
    }
  };

  render() {
    const { classes, translate, ...rest } = this.props;
    const { segments, showNamespace, showPostContentType } = this.state;
    return (
      <div>
        <SelectInput
          label={"所属应用系统"}
          {...rest}
          choices={segments.map(segment => ({
            id: segment.id,
            name: segment.name
          }))}
          className={classes.input}
          onChange={(event, key, payload) => {
            if (key === "webservice") {
              this.setState({ showNamespace: true });
            } else {
              this.setState({ showNamespace: false });
            }

            if (key === "post") {
              this.setState({ showPostContentType: true });
            } else {
              this.setState({ showPostContentType: false });
            }
            console.log("chose:" + key);
          }}
        />
        {showNamespace ? (
          <TextInput label="命名空间" source="namespace" />
        ) : null}
        {showPostContentType ? (
          <SelectInput
            choices={[
              { id: 0, name: "application/json" },
              { id: 2, name: "application/x-www-form-urlencoded" },
              { id: 1, name: "中科软框架" },
              { id: 3, name: "parameters in URL(非协议标准方式)" }
            ].map(segment => ({
              id: segment.id,
              name: segment.name
            }))}
            className={classes.input}
            label="Post Content-Type"
            source="needParaWithData"
          />
        ) : null}
      </div>
    );
  }
}

const TranslatedSegmentInput = compose(
  translate,
  withStyles(styles)
)(SegmentInput);

TranslatedSegmentInput.defaultProps = {
  source: "appname"
};

export default TranslatedSegmentInput;
