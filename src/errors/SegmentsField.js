import React from "react";
import Chip from "@material-ui/core/Chip";

const styles = {
  main: { display: "flex", flexWrap: "wrap" },
  chip: { margin: 4 }
};

const segments = [
  {
    id: "error",
    name: "被调用接口返回异常"
  },
  {
    id: "outOfTime_f",
    name: "请求超时：超出发起请求方等待时间阈值"
  },
  {
    id: "outOfTime_b",
    name: "请求超时：超出接口提供方响应时间阈值"
  }
];

const SegmentsField = ({ record }) => (
  <span style={styles.main}>
    {record.error && (
      <Chip
        key={record.error}
        style={styles.chip}
        label={segments.find(s => s.id === record.error).name}
      />
    )}
  </span>
);

SegmentsField.defaultProps = {
  addLabel: true
};

export default SegmentsField;
