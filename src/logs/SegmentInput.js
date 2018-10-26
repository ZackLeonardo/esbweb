import React from "react";
import { translate, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";

const segments = [
  { id: "1", name: "getAllOrgs" },
  { id: "2", name: "getAllUsers" }
];

const styles = {
  input: { width: 150 }
};

const SegmentInput = ({ classes, translate, ...rest }) => (
  <SelectInput
    label={"所属接口"}
    {...rest}
    choices={segments.map(segment => ({
      id: segment.id,
      name: translate(segment.name)
    }))}
    className={classes.input}
  />
);

const TranslatedSegmentInput = compose(
  translate,
  withStyles(styles)
)(SegmentInput);

TranslatedSegmentInput.defaultProps = {
  source: "apiid"
};

export default TranslatedSegmentInput;
