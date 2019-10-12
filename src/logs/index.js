import React, { Text } from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  Datagrid,
  Filter,
  List,
  NumberField,
  SearchInput,
  TextField,
  CardActions,
  RefreshButton,
  RichTextField,
  BulkDeleteButton,
  downloadCSV,
  ExportButton,
  DateInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/TextFields";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import shallowEqual from "shallowequal";

import LogdetailLinkField from "./LogdetailLinkField";
import LinkedTo from "./LinkedTo";
import dataProviderFactory from "../dataProvider";

export const LogIcon = Icon;

const hasRole = arg => {
  let roles = localStorage.getItem("role");
  return roles.indexOf(arg) > -1;
};

const LogFilter = props => (
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
  const data = records.map(record => {
    return {
      ...record,
      log_details: JSON.stringify(record.logdetails)
    };
  });

  const convertedData = dataH.concat(data);
  downloadCSV(
    convertToCSV({ data: convertedData, fields }, { header: false }),
    "logs"
  );
};
// fetchRelatedRecords(records, "id", "logs").then(posts => {});
const bulkExporter = props => {
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
            "logs"
          );
        });
    }
  );
};

const LogActions = ({
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
    <RefreshButton />
    <ExportButton
      resource={resource}
      sort={currentSort}
      filter={filterValues}
      exporter={exporter}
    />
  </CardActions>
);

const MySpendTextField = props => {
  console.log(props);
  if (props.record) {
    let start = props.record.start;
    let end = props.record.end;
    if (start && end) {
      let startTime = new Date(start);
      let endTime = new Date(end);
      return endTime.getTime() - startTime.getTime();
    }
  }

  return "--";
};

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

export const LogList = props => (
  <List
    {...props}
    filters={<LogFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<LogActions />}
    bulkActionButtons={
      hasRole("sysAdmin") ? <MyBulkActions {...props} /> : false
    } //BulkDeleteButton
  >
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="接口" source="apiname" />
      <LinkedTo label="接口信息" source="apiid" />
      <TextField label="发起调用的APP" source="appname" />
      <TextField label="成功/失败" source="result" />
      {/* <DateField label="开始调用时间" source="start" type="date" showTime /> */}
      <TextField label="开始调用时间" source="start" />
      {/* <DateField label="结束调用时间" source="end" type="date" showTime /> */}
      <TextField label="结束调用时间" source="end" />
      <MySpendTextField label="耗时(ms)" {...props} />
      <RichTextField
        label="输入参数"
        source="args"
        style={{ maxHeight: 230, maxWidth: 500, overflow: "scroll" }}
      />
      <TextField label="错误信息" source="details" />
      <RichTextField
        label="返回结果"
        source="response"
        style={{ maxHeight: 230, maxWidth: 500, overflow: "scroll" }}
      />
      <LogdetailLinkField />
    </Datagrid>
  </List>
);

const editStyles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  address: { maxWidth: 544 },
  zipcode: { display: "inline-block" },
  city: { display: "inline-block", marginLeft: 32 },
  comment: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
};

export const LogShow = withStyles(editStyles)(({ classes, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="详细日志信息">
        <MyList {...props} />
      </Tab>
    </TabbedShowLayout>
  </Show>
));

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class MyList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      myLogdetails: []
    };
  }

  componentWillMount() {
    //根据id获取详细日志
    dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
      //process.env.REACT_APP_DATA_PROVIDER
      dataProvider => {
        dataProvider("GET_MANY", "logs", {
          ids: [this.props.record.id]
        })
          .then(response => response.data)
          .then(records => {
            const logDetails = records.map(record => {
              return record.logdetails;
            });
            this.setState({
              myLogdetails: logDetails[0]
            });
          });
      }
    );
  }

  render() {
    // console.log(this.state.myLogdetails);

    return (
      // <Paper className={classes.root}>
      //   <Table className={classes.table}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">事件</TableCell>
              <TableCell align="right">结束时间</TableCell>
              <TableCell align="right">结果</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.myLogdetails.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.event}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
