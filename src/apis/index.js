import React from "react";
import {
  Create,
  Show,
  TabbedShowLayout,
  Tab,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  Filter,
  FormTab,
  List,
  LongTextInput,
  NullableBooleanInput,
  NumberField,
  ReferenceManyField,
  Responsive,
  SearchInput,
  TabbedForm,
  TextField,
  TextInput,
  Button,
  Link,
  CardActions,
  RefreshButton,
  SaveButton,
  CreateButton,
  Toolbar
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Add";

import FullNameField from "./FullNameField";
import SegmentInput from "./SegmentInput";
import ApidetailLinkField from "./ApidetailLinkField";
import ApiLogLinkField from "./ApiLogLinkField";
import MobileGrid from "./MobileGrid";

export const ApiIcon = Icon;

const ApiFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <SegmentInput alwaysOn />
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

const ApiActions = ({
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
    <CreateButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

export const ApiList = withStyles(listStyles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<ApiFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<ApiActions />}
  >
    <Responsive
      xsmall={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField label="接口名称" source="apiname" />
          <TextField label="所属应用系统" source="appname" />
          <TextField label="接口版本" source="version" />
          <TextField label="接口协议" source="transfer" />
          <TextField label="接口状态" source="status" />
          <TextField label="最新修改时间" source="modifydate" />
          <TextField label="最新修改人" source="modifyuser" />
          <TextField label="备注" source="remarks" />
          <ApidetailLinkField />
          <ApiLogLinkField />
          {/* <Link to={`/apidetails/1`} label={"详细信息"}>
            详细信息
          </Link> */}
          {1 > 0 ? <EditButton /> : null}
        </Datagrid>
      }
    />
  </List>
));

const ApiTitle = ({ record }) =>
  record ? <FullNameField record={record} size={32} /> : null;

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

const ApiEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
    <Button component={Link} to={`/apis`} label={"返回"} />
  </Toolbar>
);

export const ApiEdit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit {...props}>
    <TabbedForm toolbar={<ApiEditToolbar />}>
      <FormTab label="基本信息">
        <TextInput label="接口名称" source="apiname" />
        <TextInput label="所属应用系统" source="appname" />
        <TextInput label="接口版本" source="version" />
        <TextInput label="接口协议" source="transfer" />
        <TextInput label="接口状态" source="status" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
      <FormTab label="接口地址">
        <TextInput label="接口地址" source="url" />
      </FormTab>
      <FormTab label="输入参数说明">
        <TextInput
          label="参数名称"
          source="args1"
          formClassName={classes.first_name}
        />
        <TextInput
          label="参数约束"
          source="argsr1"
          formClassName={classes.last_name}
        />
      </FormTab>
      <FormTab label="输出数据说明">
        <TextInput
          label="参数名称"
          source="output1"
          formClassName={classes.first_name}
        />
      </FormTab>
    </TabbedForm>
  </Edit>
));

export const ApiCreate = withStyles(editStyles)(({ classes, ...props }) => (
  <Create {...props}>
    <TabbedForm toolbar={<ApiEditToolbar />}>
      <FormTab label="resources.apis.tabs.createInfo">
        <TextInput label="接口名称" source="apiname" />
        <TextInput label="所属应用系统" source="appname" />
        <TextInput label="接口版本" source="version" />
        <TextInput label="接口协议" source="transfer" />
        <TextInput label="接口状态" source="status" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
      <FormTab label="接口地址">
        <TextInput label="接口地址" source="url" />
      </FormTab>
      <FormTab label="输入参数说明">
        <TextInput
          label="参数名称"
          source="args1"
          formClassName={classes.first_name}
        />
        <TextInput
          label="参数约束"
          source="argsr1"
          formClassName={classes.last_name}
        />
      </FormTab>
      <FormTab label="输出数据说明">
        <TextInput
          label="参数名称"
          source="output1"
          formClassName={classes.first_name}
        />
      </FormTab>
    </TabbedForm>
  </Create>
));

export const ApiShow = withStyles(editStyles)(({ classes, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="基本信息">
        <TextField label="接口名称" source="apiname" />
        <TextField label="所属应用系统" source="appname" />
        <TextField label="接口版本" source="version" />
        <TextField label="接口协议" source="transfer" />
        <TextField label="接口状态" source="status" />
        <TextField label="最新修改时间" source="modifydate" />
        <TextField label="最新修改人" source="modifyuser" />
        <TextField label="备注" source="remarks" />
      </Tab>
      <FormTab label="接口地址">
        <TextField label="接口地址" source="url" />
      </FormTab>
      <FormTab label="输入参数说明">
        <TextField
          label="参数名称"
          source="args1"
          formClassName={classes.first_name}
        />
        <TextField
          label="参数约束"
          source="argsr1"
          formClassName={classes.last_name}
        />
      </FormTab>
      <FormTab label="输出数据说明">
        <TextField
          label="参数名称"
          source="output1"
          formClassName={classes.first_name}
        />
      </FormTab>
    </TabbedShowLayout>
  </Show>
));
