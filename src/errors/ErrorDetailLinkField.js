import React from "react";
import { Link } from "react-admin";
import get from "lodash/get";

const ErrorDetailLinkField = props => {
  const { record, source, label, location } = props;
  console.log(location);
  let pathname;
  if (location.includes("history")) {
    pathname = `/logs?filter={"q":"${get(
      record,
      source
    )}","selectedtable":"history"}&order=DESC&page=1&perPage=25&sort=id`;
  } else {
    pathname = `/logs?filter={"q":"${get(
      record,
      source
    )}","selectedtable":"current"}&order=DESC&page=1&perPage=25&sort=id`;
  }

  return (
    <Link
      to={{
        pathname: pathname
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
