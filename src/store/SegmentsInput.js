import React, { Component } from "react";
import { SelectArrayInput } from "react-admin";
// import { connect } from 'react-redux';
import { UserEdit } from "../users";
// import { dispatch } from "react-redux";
import compose from "recompose/compose";
import { connect } from "react-redux";
import dataProviderFactory from "../dataProvider";

class SegmentsInput extends Component {
  state = {
    loading: false,
    segments: []
  };

  componentWillMount = () => {
    dataProviderFactory(rocess.env.REACT_APP_DATA_PROVIDER).then(
      //process.env.REACT_APP_DATA_PROVIDER
      dataProvider => {
        dataProvider("GET_LIST", "users", {
          // filter: { status: 1 },
          pagination: { page: 1, perPage: 9999 },
          sort: { field: "userid", order: "ASC" }
        })
          .then(response => response.data)
          .then(users =>
            users.map(user => {
              return { id: user.userid, name: user.username };
            })
          )
          .then(segments => this.setState({ segments: segments }));
      }
    );
  };

  // componentWillMount = () => {
  //   const { dispatch, usersegmets } = this.props;

  //   if (!usersegmets.data[0]) {
  //     dispatch({
  //       type: "RA/CRUD_GET_LIST",
  //       payload: {
  //         pagination: { page: 1, perPage: 9999 },
  //         sort: { field: "userid", order: "ASC" },
  //         filter: { status: 1 }
  //       },
  //       meta: {
  //         resource: "users",
  //         fetch: "GET_LIST",
  //         onFailure: {
  //           notification: {
  //             body: "ra.notification.http_error",
  //             level: "warning"
  //           }
  //         }
  //       }
  //     });
  //     // dispatch({
  //     //   GET_MANY, 'posts', { ids: [123, 124, 125] }
  //     // })
  //   } else {
  //     do {
  //       this.segments[this.segmentCount] = usersegmets.data[this.segmentCount];
  //       this.segmentCount++;
  //     } while (usersegmets.data[this.segmentCount]);
  //   }
  // };

  render() {
    const { addField, ...rest } = this.props;

    const { segments } = this.state;

    return (
      segments.length > 0 && (
        <SelectArrayInput
          {...rest}
          choices={segments.map(segment => ({
            id: segment.name,
            name: segment.name
          }))}
        />
      )
    );
  }
}

SegmentsInput.defaultProps = {
  addField: true
};

// function mapStateToProps(state) {
//   return {
//     usersegmets: state.admin.resources.users
//   };
// }

// export default compose(connect(mapStateToProps))(SegmentsInput);
export default SegmentsInput;
