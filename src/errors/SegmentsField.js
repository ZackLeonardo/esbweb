import React from "react";
import Chip from "@material-ui/core/Chip";

const styles = {
  main: { display: "flex", flexWrap: "wrap" },
  chip: { margin: 4 }
};

const SegmentsField = ({ record }) => (
  <span style={styles.main}>
    {record.apimanager &&
      record.apimanager.map(segment => (
        <Chip key={segment} style={styles.chip} label={segment} />
      ))}
  </span>
);

SegmentsField.defaultProps = {
  addLabel: true,
  source: "apimanager"
};

export default SegmentsField;
