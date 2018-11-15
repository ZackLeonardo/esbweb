import React, { Component } from "react";
import { translate, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import dataProviderFactory from "../dataProvider";
import shallowEqual from "shallowequal";

const styles = {
  input: { width: 150 }
};

class SegmentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      segments: null,
      dataProvider: null,
      filterAppid: null
    };

    this.nextAppid = null;
    this.dp = this.dp.bind(this);
  }

  componentWillMount = () => {
    const { source } = this.props;
    if (source === "appid") {
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
    } else if (source === "apiid") {
      dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
        //process.env.REACT_APP_DATA_PROVIDER
        dataProvider => {
          dataProvider("GET_LIST", "apis", {
            // filter: { status: "启用" },
            pagination: { page: 1, perPage: 9999 },
            sort: { field: "id", order: "ASC" }
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

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.source === "id" &&
      this.props.appid &&
      this.state.segments &&
      this.props.appid === nextProps.appid &&
      shallowEqual(this.state, nextState)
    ) {
      return false;
    }
    return true;
  }

  dp = () => {
    const dataProvider = this.state.dataProvider;
    dataProvider("GET_LIST", "apis", {
      filter: { appid: this.nextAppid },
      pagination: { page: 1, perPage: 9999 },
      sort: { field: "id", order: "ASC" }
    })
      .then(response => response.data)
      .then(items =>
        items.map(item => {
          return { id: item.id, name: item.apiname };
        })
      )
      .then(segments => {
        this.setState({ segments: segments });
      });
  };

  componentWillUpdate(nextProps, nextState) {
    const { source, appid } = this.props;
    this.nextAppid = nextProps.appid;

    if (source === "id" && appid !== this.nextAppid) {
      dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER)
        .then(
          //process.env.REACT_APP_DATA_PROVIDER
          dataProvider =>
            this.setState({
              dataProvider: dataProvider
            })
        )
        .then(() => this.dp());
    }
  }

  render() {
    const { classes, translate, choices, ...rest } = this.props;
    const { segments } = this.state;
    return segments ? (
      <SelectInput
        {...rest}
        choices={
          choices
            ? choices
            : segments.map(segment => ({
                id: segment.id,
                name: segment.name
              }))
        }
        className={classes.input}
      />
    ) : null;
  }
}

const TranslatedSegmentInput = compose(
  translate,
  withStyles(styles)
)(SegmentInput);

TranslatedSegmentInput.defaultProps = {};

export default TranslatedSegmentInput;
