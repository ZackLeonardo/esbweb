import React, { Component } from "react";
import { translate, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import dataProviderFactory from "../dataProvider";

const styles = {
  input: { width: 150 }
};

class SegmentInput extends Component {
  state = {
    segments: []
  };

  componentWillMount = () => {
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
  };

  render() {
    const { classes, translate, ...rest } = this.props;
    const { segments } = this.state;
    return (
      <SelectInput
        label={"所属应用系统"}
        {...rest}
        choices={segments.map(segment => ({
          id: segment.id,
          name: translate(segment.name)
        }))}
        className={classes.input}
      />
    );
  }
}

const TranslatedSegmentInput = compose(
  translate,
  withStyles(styles)
)(SegmentInput);

TranslatedSegmentInput.defaultProps = {
  source: "appid"
};

export default TranslatedSegmentInput;
