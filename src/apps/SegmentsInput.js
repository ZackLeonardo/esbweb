import React, { Component } from "react";
import { SelectArrayInput } from "react-admin";
// import { connect } from 'react-redux';
import { UserEdit } from "../users";
// import { dispatch } from "react-redux";
import compose from "recompose/compose";
import { connect } from "react-redux";

class SegmentsInput extends Component {
  state = {
    loading: false
  };
  segmentCount = 0;
  segments = [];

  componentWillMount = () => {
    const { dispatch, usersegmets } = this.props;

    if (!usersegmets.data[0]) {
      dispatch({
        type: "RA/CRUD_GET_LIST",
        payload: {
          pagination: { page: 1, perPage: 9999 },
          sort: { field: "userid", order: "ASC" },
          filter: { status: 1 }
        },
        meta: {
          resource: "users",
          fetch: "GET_LIST",
          onFailure: {
            notification: {
              body: "ra.notification.http_error",
              level: "warning"
            }
          }
        }
      });
      // dispatch({
      //   GET_MANY, 'posts', { ids: [123, 124, 125] }
      // })
    } else {
      do {
        this.segments[this.segmentCount] = usersegmets.data[this.segmentCount];
        this.segmentCount++;
      } while (usersegmets.data[this.segmentCount]);
    }
  };

  render() {
    const { addField, dispatch, usersegmets, ...rest } = this.props;
    return (
      this.segments.length > 0 && (
        <SelectArrayInput
          {...rest}
          choices={this.segments.map(segment => ({
            id: segment.userid,
            name: segment.username
          }))}
        />
      )
    );
  }
}

SegmentsInput.defaultProps = {
  addField: true
};

function mapStateToProps(state) {
  return {
    usersegmets: state.admin.resources.users
  };
}

export default compose(connect(mapStateToProps))(SegmentsInput);
