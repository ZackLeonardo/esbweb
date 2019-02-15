import React from "react";
import { Link, TextField } from "react-admin";

const ApiLogLinkField = props => {
  return (
    <Link to={`/logs`} label={"调用日志"}>
      调用日志
    </Link>
  );
};

ApiLogLinkField.defaultProps = {
  addLabel: true
};

export default ApiLogLinkField;
