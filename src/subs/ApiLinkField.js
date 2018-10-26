import React from "react";
import { Link, TextField } from "react-admin";

const ApiLinkField = props => {
  console.log(props);

  return (
    <Link to={`/apis`} label={"接口信息"}>
      接口信息
    </Link>
  );
};

ApiLinkField.defaultProps = {
  addLabel: true
};

export default ApiLinkField;
