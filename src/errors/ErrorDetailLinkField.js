import React from "react";
import { Link, TextField } from "react-admin";
import get from "lodash/get";

const ErrorDetailLinkField = props => {
  const { record, source, label } = props;

  return (
    <Link
      to={{
        pathname: `/logs?filter={"q": "${get(
          record,
          source
        )}"}&order=DESC&page=1&perPage=25&sort=id`
      }}
      label={label}
    >
      {label}
    </Link>
  );
};

ErrorDetailLinkField.defaultProps = {
  addLabel: true
};

export default ErrorDetailLinkField;
