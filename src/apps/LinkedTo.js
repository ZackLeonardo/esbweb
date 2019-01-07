import React from "react";
import get from "lodash/get";
import { Link } from "react-admin";
import pure from "recompose/pure";

class LinkedTo extends React.Component {
  render() {
    const { record, source, label } = this.props;
    return (
      <Link
        to={{
          pathname: `/apis?filter={"appid": "${get(
            record,
            source
          )}"}&order=DESC&page=1&perPage=25&sort=id`
          // search: stringify({
          //   page: 1,
          //   perPage: 25,
          //   filter: JSON.stringify({ appid: records.appid })
          // })
        }}
        label={label}
      >
        {label}
      </Link>
    );
  }
}
LinkedTo.displayName = "LinkedTo";
const PureLinkedTo = pure(LinkedTo);

PureLinkedTo.defaultProps = {
  addLabel: true
};

export default PureLinkedTo;
// export default LinkedTo;
