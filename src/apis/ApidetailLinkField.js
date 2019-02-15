import React from "react";
import { Link } from "react-admin";

const ApidetailLinkField = props => {
  return (
    <Link to={`/apis/${props.record.id}/show`} label={"详细信息"}>
      详细信息
    </Link>
  );
};

ApidetailLinkField.defaultProps = {
  addLabel: true
};

export default ApidetailLinkField;
