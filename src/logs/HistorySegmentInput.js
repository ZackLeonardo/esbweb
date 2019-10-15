import React from "react";
import { translate, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";

const segments = [
  { id: "current", name: "当前表（七天）" },
  { id: "history", name: "历史表（七天前）" }
];

const styles = {
  input: { width: 150 }
};

const HistorySegmentInput = ({ classes, translate, ...rest }) => {
  return rest.input.value === "current" || rest.input.value === "history" ? (
    <SelectInput
      label={"范围"}
      {...rest}
      // input={
      //   rest.input.value === "current" || rest.input.value === "history"
      //     ? rest.input.value
      //     : { ...rest.input, value: "current" }
      // }
      choices={segments.map(segment => ({
        id: segment.id,
        name: translate(segment.name)
      }))}
      className={classes.input}
      allowEmpty={false}
    />
  ) : (
    <SelectInput
      label={"范围"}
      {...rest}
      input={{ ...rest.input, value: "current" }}
      choices={segments.map(segment => ({
        id: segment.id,
        name: translate(segment.name)
      }))}
      className={classes.input}
      allowEmpty={false}
    />
  );
};

const TranslatedSegmentInput = compose(
  translate,
  withStyles(styles)
)(HistorySegmentInput);

TranslatedSegmentInput.defaultProps = {
  source: "selectedtable"
};

export default TranslatedSegmentInput;
