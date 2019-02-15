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
  BulkDeleteButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Error";

import MobileGrid from "./MobileGrid";
import ErrorDetailLinkField from "./ErrorDetailLinkField";

export const ErrorIcon = Icon;

const hasRole = arg => {
  let roles = localStorage.getItem("role");
  return roles.indexOf(arg) > -1;
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
  </CardActions>
);

export const ErrorList = withStyles(listStyles)(({ classes, ...props }) => (
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
          <TextField label="异常情况" source="error" />
          <TextField label="异常时间" source="time" />
          <ErrorDetailLinkField label="查看日志信息" source="logid" />
        </Datagrid>
      }
    />
  </List>
));

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
