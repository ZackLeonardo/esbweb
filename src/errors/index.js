import React from "react";
import {
  Datagrid,
  Filter,
  List,
  NumberField,
  Responsive,
  SearchInput,
  TextField,
  CardActions,
  RefreshButton,
  BulkDeleteButton,
  downloadCSV,
  ExportButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Error";
import { unparse as convertToCSV } from "papaparse/papaparse.min";

import MobileGrid from "./MobileGrid";
import ErrorDetailLinkField from "./ErrorDetailLinkField";
import LinkedTo from "./LinkedTo";

export const ErrorIcon = Icon;

const hasRole = arg => {
  let roles = localStorage.getItem("role");
  return roles.indexOf(arg) > -1;
};

// const exporter = (records, fetchRelatedRecords) => {
//   fetchRelatedRecords(records, "ids", "logs").then(logs => {
//     const data = records.map(record => ({
//       ...record,
//       details_logs: JSON.stringify(logs[record.id])
//     }));
//     const csv = convertToCSV({
//       data,
//       fields: ["id", "apiname", "appname", "end", "details", "response"]
//     });
//     downloadCSV(csv, "errors");
//   });
// };
const exporter = (records, fetchRelatedRecords) => {
  const data = records;
  const fields = ["id", "apiname", "appname", "error", "time"];
  downloadCSV(convertToCSV({ data, fields }), "errors");
};

const ErrorFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
);

const colored = WrappedComponent => {
  const Colored = props =>
    props.record[props.source] > 500 ? (
      <span style={{ color: "red" }}>
        <WrappedComponent {...props} />
      </span>
    ) : (
      <WrappedComponent {...props} />
    );

  Colored.displayName = `Colored(${WrappedComponent.displayName})`;

  return Colored;
};

export const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

const listStyles = {
  nb_commands: { color: "purple" }
};

const ErrorActions = ({
  bulkActions,
  currentSort,
  basePath,
  displayedFilters,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter
}) => (
  <CardActions>
    {bulkActions &&
      React.cloneElement(bulkActions, {
        basePath,
        filterValues,
        resource,
        selectedIds,
        onUnselectItems
      })}
    {filters &&
      React.cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button"
      })}
    <RefreshButton label="刷新" />
    <ExportButton
      resource={resource}
      sort={currentSort}
      filter={filterValues}
      exporter={exporter}
    />
  </CardActions>
);

export const ErrorList = props => (
  <List
    {...props}
    filters={<ErrorFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<ErrorActions />}
    bulkActionButtons={hasRole("sysAdmin") ? <BulkDeleteButton /> : false}
  >
    <Responsive
      xsmall={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField label="ID" source="id" />
          <TextField label="接口名称" source="apiname" />
          <LinkedTo label="接口信息" source="apiname" />
          <TextField label="发起调用应用系统" source="appname" />
          <TextField label="异常情况" source="error" />
          <TextField label="异常时间" source="time" />
          <ErrorDetailLinkField label="查看日志信息" source="logid" />
        </Datagrid>
      }
    />
  </List>
);

// const ErrorTitle = ({ record }) =>
//   record ? <FullNameField record={record} size={32} /> : null;

// const editStyles = {
//   first_name: { display: "inline-block" },
//   last_name: { display: "inline-block", marginLeft: 32 },
//   email: { width: 544 },
//   address: { maxWidth: 544 },
//   zipcode: { display: "inline-block" },
//   city: { display: "inline-block", marginLeft: 32 },
//   comment: {
//     maxWidth: "20em",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap"
//   }
// };
