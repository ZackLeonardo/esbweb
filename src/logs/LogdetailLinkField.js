import React from "react";
import { Link } from "react-admin";

const LogdetailLinkField = props => {
  return (
    <Link to={`/logs/${props.record.id}/show`} label={"详细信息"}>
      详细信息
    </Link>
  );
};

LogdetailLinkField.defaultProps = {
  addLabel: true
};

export default LogdetailLinkField;
