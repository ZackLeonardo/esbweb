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
  RichTextField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/TextFields";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import LogdetailLinkField from "./LogdetailLinkField";

export const LogIcon = Icon;

const hasRole = arg => {
  let roles = localStorage.getItem("role");
  return roles.indexOf(arg) > -1;
};

const LogFilter = props => (
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

const LogActions = ({
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
    <RefreshButton />
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

export const LogList = props => (
  <List
    {...props}
    filters={<LogFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<LogActions />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="接口" source="apiname" />
      <TextField label="发起调用的APP" source="appname" />
      <TextField label="成功/失败" source="result" />
      {/* <DateField label="开始调用时间" source="start" type="date" showTime /> */}
      <TextField label="开始调用时间" source="start" />
      {/* <DateField label="结束调用时间" source="end" type="date" showTime /> */}
      <TextField label="结束调用时间" source="end" />
      <MySpendTextField label="耗时(ms)" {...props} />
      <TextField label="输入参数" source="args" />
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

const MyList = withStyles(styles)(({ classes, ...props }) => {
  console.log("mylist");

  console.log(props);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">事件</TableCell>
            <TableCell align="right">结束时间</TableCell>
            <TableCell align="right">结果</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.record.logdetails.map(row => (
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
});
