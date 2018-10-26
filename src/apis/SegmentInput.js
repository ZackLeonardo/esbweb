import React from "react";
import { translate, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";

const segments = [
  { id: "1", name: "用户管理" },
  { id: "2", name: "权限管理" },
  { id: "3", name: "前端工作平台" }
];

const styles = {
  input: { width: 150 }
};

const SegmentInput = ({ classes, translate, ...rest }) => (
  <SelectInput
    label={"所属应用系统"}
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
