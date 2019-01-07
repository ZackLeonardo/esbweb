import React from "react";
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
  RichTextField
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

export const LogList = withStyles(listStyles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<LogFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<LogActions />}
  >
    <Responsive
      xsmall={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField label="ID" source="id" />
          <TextField label="接口" source="apiname" />
          <TextField label="发起调用的APP" source="appname" />
          <TextField label="成功/失败" source="result" />
          <DateField label="开始调用时间" source="start" type="date" showTime />
          <DateField label="结束调用时间" source="end" type="date" showTime />
          <TextField label="耗时" source="spend" />
          <TextField label="输入参数" source="args" />
          <RichTextField label="返回结果" source="response" />
          <LogdetailLinkField />
        </Datagrid>
      }
    />
  </List>
));

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

export const LogShow = withStyles(editStyles)(({ classes, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="详细日志信息">
        <RichTextField label="日志如下：" source="response" />
      </Tab>
    </TabbedShowLayout>
  </Show>
));
