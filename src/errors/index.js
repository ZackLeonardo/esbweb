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
  ExportButton,
  DateInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Error";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import Button from "@material-ui/core/Button";

import dataProviderFactory from "../dataProvider";
import MobileGrid from "./MobileGrid";
import ErrorDetailLinkField from "./ErrorDetailLinkField";
import LinkedTo from "./LinkedTo";

export const ErrorIcon = Icon;

const hasRole = arg => {
  let roles = localStorage.getItem("role");
  return roles.indexOf(arg) > -1;
};

const fields = [
  "id",
  "apiname",
  "appname",
  "result",
  "start",
  "end",
  "details",
  "args",
  "response",
  "log_details"
];

const dataH = [
  {
    id: "日志id",
    apiname: "api名称",
    appname: "发起调用的app",
    result: "结果",
    start: "开始时间",
    end: "结束时间",
    details: "错误信息",
    args: "输入参数",
    response: "返回结果",
    log_details: "详细日志"
  }
];

const exporter = (records, fetchRelatedRecords) => {
  fetchRelatedRecords(records, "id", "logs").then(logs => {
    const data = records.map(record => ({
      ...record,
      ...logs[record.id],
      log_details: JSON.stringify(logs[record.id].logdetails)
    }));
    const convertedData = dataH.concat(data);
    const csv = convertToCSV(
      {
        data: convertedData,
        fields
        // fields: ["logid", "apiname", "appname", "error", "time", "details_logs"]
      },
      { header: false }
    );
    downloadCSV(csv, "errors");
  });
};
// const exporter = (records, fetchRelatedRecords) => {
//   const data = records;
//   const fields = ["id", "apiname", "appname", "error", "time"];
//   downloadCSV(convertToCSV({ data, fields }), "errors");
// };
const bulkExporter = props => {
  // console.log(props);

  dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
    //process.env.REACT_APP_DATA_PROVIDER
    dataProvider => {
      dataProvider("GET_MANY", "logs", {
        ids: props.selectedIds
      })
        .then(response => response.data)
        .then(records => {
          const data = records.map(record => {
            return {
              ...record,
              log_details: JSON.stringify(record.logdetails)
            };
          });

          const convertedData = dataH.concat(data);
          downloadCSV(
            convertToCSV({ data: convertedData, fields }, { header: false }),
            "errors"
          );
        });
    }
  );
};

const ErrorFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <DateInput label="开始日期" source="date_gte" alwaysOn />
    <DateInput label="结束日期" source="date_lte" alwaysOn />
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

const buttonStyles = theme => ({
  button: {
    marginLeft: 10,
    minWidth: 70
    // backgroundColor: "red"
  }
});

const MyBulkActions = withStyles(buttonStyles)(({ classes, ...props }) => (
  <CardActions>
    <BulkDeleteButton {...props} />
    <Button
      variant="raised"
      color="primary"
      // disabled={}
      className={classes.button}
      onClick={() => bulkExporter(props)}
    >
      导出选中
    </Button>
  </CardActions>
));

export const ErrorList = props => (
  <List
    {...props}
    filters={<ErrorFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<ErrorActions />}
    bulkActionButtons={
      hasRole("sysAdmin") ? <MyBulkActions {...props} /> : false
    }
  >
    <Responsive
      xsmall={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField label="日志ID" source="id" />
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
