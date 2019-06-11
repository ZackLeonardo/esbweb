import React from "react";
import Chip from "@material-ui/core/Chip";
import { TextField } from "react-admin";

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  chip: { margin: 4 }
};

const getContentType = value => {
  if (value === 0) {
    return "Post Content-Type：application/json";
  }
  if (value === 1) {
    return "中科软框架";
  }
  if (value === 2) {
    return "Post Content-Type：application/x-www-form-urlencoded";
  }
  if (value === 3) {
    return "parameters in URL(非协议标准方式)";
  }
};

const SegmentsField = ({ record, source }) => (
  <span style={styles.main}>
    {record[source] && (
      <Chip key={record[source]} style={styles.chip} label={record[source]} />
    )}
    {source === "transfer" && record["namespace"] ? (
      <div style={{ marginLeft: 10 }}>{"命名空间：" + record["namespace"]}</div>
    ) : // <TextField label="接口版本" value={record["namespace"]} />
    null}
    {source === "requestmode" && record["needParaWithData"] ? (
      <div style={{ marginLeft: 10 }}>
        {getContentType(record["needParaWithData"])}
      </div>
    ) : // <TextField label="接口版本" value={record["namespace"]} />
    null}
  </span>
);

SegmentsField.defaultProps = {
  addLabel: true
};

export default SegmentsField;
