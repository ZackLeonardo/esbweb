import React from "react";
import Chip from "@material-ui/core/Chip";

const styles = {
  main: { display: "flex", flexWrap: "wrap" },
  chip: { margin: 4 }
};

const SegmentsField = ({ record, source }) => (
  <span style={styles.main}>
    {record[source] && (
      <Chip key={record[source]} style={styles.chip} label={record[source]} />
    )}
  </span>
);

SegmentsField.defaultProps = {
  addLabel: true
};

export default SegmentsField;
