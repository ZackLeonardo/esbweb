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

const PostPanel = ({ id, record, resource }) => {
  console.log("PostPanel");

  return <Text>test</Text>;
};

export const LogList = props => (
  <List {...props}>
    <Datagrid expand={<PostPanel />}>
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
        <List
          {...props}
          sort={{ field: "id", order: "DESC" }}
          perPage={25}
          actions={null}
          bulkActionButtons={null}
          aside={null}
          rowsPerPageOptions={[]}
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
      </Tab>
    </TabbedShowLayout>
  </Show>
));
