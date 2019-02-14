import React, { Text } from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  Datagrid,
  DateField,
  Filter,
  List,
  NumberField,
  Responsive,
  SearchInput,
  TextField,
  CardActions,
  RefreshButton,
  RichTextField,
  Card
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
import MobileGrid from "./MobileGrid";

export const LogIcon = Icon;

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

const listStyles = {
  nb_commands: { color: "purple" }
};

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

export const LogList = props => (
  <List {...props}>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="接口" source="apiname" />
      <TextField label="发起调用的APP" source="appname" />
      <TextField label="成功/失败" source="result" />
      {/* <DateField label="开始调用时间" source="start" type="date" showTime /> */}
      <TextField label="开始调用时间" source="start" />
      {/* <DateField label="结束调用时间" source="end" type="date" showTime /> */}
      <TextField label="结束调用时间" source="end" />
      <TextField label="耗时(ms)" source="spend" />
      <TextField label="输入参数" source="args" />
      <TextField label="错误信息" source="details" />
      <RichTextField label="返回结果" source="response" />
      <LogdetailLinkField />
    </Datagrid>
  </List>
);

// export const LogList = withStyles(listStyles)(({ classes, ...props }) => {
//   return (
//     <List
//       {...props}
//       filters={<LogFilter />}
//       sort={{ field: "id", order: "DESC" }}
//       perPage={25}
//       actions={<LogActions />}
//       bulkActionButtons={false}
//     >
//       <Datagrid expand={<PostPanel />}>
//         <TextField label="ID" source="id" />
//         <TextField label="接口" source="apiname" />
//         <TextField label="发起调用的APP" source="appname" />
//         <TextField label="成功/失败" source="result" />
//         {/* <DateField label="开始调用时间" source="start" type="date" showTime /> */}
//         <TextField label="开始调用时间" source="start" />
//         {/* <DateField label="结束调用时间" source="end" type="date" showTime /> */}
//         <TextField label="结束调用时间" source="end" />
//         <TextField label="耗时(ms)" source="spend" />
//         <TextField label="输入参数" source="args" />
//         <TextField label="错误信息" source="details" />
//         <RichTextField label="返回结果" source="response" />
//         <LogdetailLinkField />
//       </Datagrid>
//     </List>
//   );
// });

// const LogTitle = ({ record }) =>
//   record ? <FullNameField record={record} size={32} /> : null;

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

const DetailsShow = props => (
  <Show
    {...props}
    /* disable the app title change when shown */
    title=" "
  >
    <List
      {...props}
      sort={{ field: "id", order: "DESC" }}
      perPage={25}
      actions={null}
      bulkActionButtons={null}
      aside={null}
      // rowsPerPageOptions={null}
      pagination={null}
    >
      <Responsive
        xsmall={<MobileGrid />}
        medium={
          <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="事件" source="event" />
            <TextField label="结束时间" source="time" />
            <TextField label="成功/失败" source="result" />
          </Datagrid>
        }
      />
    </List>
  </Show>
);

const CommentGrid = ({ ids, data, basePath }) => (
  <div style={{ margin: "1em" }}>
    {ids.map(id => (
      <Datagrid>
        <TextField record={data[id]} label="ID" source="id" />
        <TextField record={data[id]} label="事件" source="event" />
        <TextField record={data[id]} label="结束时间" source="time" />
        <TextField record={data[id]} label="成功/失败" source="result" />
      </Datagrid>
    ))}
  </div>
);

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
  // let id = 0;
  // function createData(name, calories, fat, carbs, protein) {
  //   id += 1;
  //   return { id, name, calories, fat, carbs, protein };
  // }
  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9)
  // ];
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

// props => {
//   const { record, ...rest } = props;
//   console.log("MyList");
//   console.log(record);
//   console.log(rest);

//   const newProps = {
//     ...rest,
//     record: props.record.logdetails[props.id]
//   };

//   return (
//     <div style={{ maxWidth: "100%" }}>
//       <MaterialTable
//         columns={[
//           { title: "id", field: "name" },
//           { title: "Soyadı", field: "surname" },
//           { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
//           {
//             title: "Doğum Yeri",
//             field: "birthCity",
//             lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
//           }
//         ]}
//         data={[
//           { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
//         ]}
//         title="Demo Title"
//       />
//     </div>
//   );
// };

// export const LogShow = props => {
//   return (
//     <Show {...props}>
//       <MyList {...props} />
//       {/* <TabbedShowLayout>
//       <Tab label="详细日志信息">

//       </Tab>
//     </TabbedShowLayout> */}
//     </Show>
//   );
// };
