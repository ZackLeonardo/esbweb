import React from "react";
import {
  Create,
  Show,
  TabbedShowLayout,
  Tab,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Filter,
  FormTab,
  List,
  NumberField,
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
  Toolbar,
  RichTextField,
  ArrayInput,
  ArrayField,
  SimpleFormIterator
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Add";
import RichTextInput from "ra-input-rich-text";

import SegmentsField from "./SegmentsField";
import SegmentInput from "./SegmentInput";
import ApidetailLinkField from "./ApidetailLinkField";
import LinkedTo from "./LinkedTo";
import LinkedToSubs from "./LinkedToSubs";
import MobileGrid from "./MobileGrid";

export const ApiIcon = Icon;

const ApiFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <SegmentInput source="appid" alwaysOn />
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
          <TextField label="接口ID" source="id" />
          <TextField label="接口名称" source="apiname" />
          <SegmentsField label="所属应用系统" source="appname" />
          <TextField label="接口版本" source="edition" />
          <SegmentsField label="接口协议" source="transfer" />
          <SegmentsField label="调用方式" source="requestmode" />
          <SegmentsField label="接口状态" source="cyclestatus" />
          <DateField
            label="最新修改时间"
            source="apilastmodifytime"
            type="date"
            showTime
          />
          <TextField label="最新修改人" source="apilastmodifier" />
          <TextField label="备注" source="remarks" />
          <ApidetailLinkField />
          <LinkedTo label="调用日志" source="id" />
          <LinkedToSubs label="订阅情况" source="id" />
          {/* <Link to={`/apidetails/1`} label={"详细信息"}>
            详细信息
          </Link> */}
          {1 > 0 ? <EditButton /> : null}
        </Datagrid>
      }
    />
  </List>
));

// const ApiTitle = ({ record }) =>
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

const ApiEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
    <Button component={Link} to={`/apis`} label={"返回"} />
  </Toolbar>
);

export const ApiEdit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit {...props}>
    <TabbedForm toolbar={<ApiEditToolbar />} style={{ width: "100%" }}>
      <FormTab label="基本信息">
        <TextField label="接口ID" source="id" />
        <TextInput label="接口名称" source="apiname" />
        <TextInput label="接口版本" source="edition" />
        <SegmentInput label="所属应用系统" source="appid" />
        <SegmentInput label="接口协议" source="transfer" />
        <SegmentInput label="调用方式" source="requestmode" />
        <SegmentInput label="接口状态" source="cyclestatusid" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
      <FormTab label="接口地址">
        <TextInput label="接口地址" source="url" />
      </FormTab>
      <FormTab label="输入参数说明" style={{ width: "100%" }}>
        <ArrayInput label="参数表" source="args">
          <SimpleFormIterator>
            <TextInput label="参数名称" source="parametername" />
            <SegmentInput label="是否必填" source="required" />
            <TextInput label="参数描述" source="description" />
            <TextInput label="示例" source="example" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="输出数据说明">
        <RichTextInput
          toolbar={null}
          label="输出数据说明"
          source="outputexample"
        />
        <TextInput label="接口响应超时时间（ms）" source="apitimeout" />
      </FormTab>
    </TabbedForm>
  </Edit>
));

export const ApiCreate = withStyles(editStyles)(({ classes, ...props }) => {
  return (
    <Create {...props}>
      <TabbedForm toolbar={<ApiEditToolbar />}>
        <FormTab label="基本信息">
          <TextInput label="接口名称" source="apiname" />
          <TextInput label="接口版本" source="edition" />
          <SegmentInput label="所属应用系统" source="appid" />
          <SegmentInput
            label="接口协议"
            source="transfer"
            // showNamespace={this.showNamespace}
          />
          <SegmentInput label="调用方式" source="requestmode" />
          <SegmentInput label="接口状态" source="cyclestatusid" />
          <TextInput label="备注" source="remarks" />
        </FormTab>
        <FormTab label="接口地址">
          <TextInput label="接口地址" source="url" />
        </FormTab>
        <FormTab label="输入参数说明" style={{ width: "100%" }}>
          <ArrayInput label="参数表" source="args">
            <SimpleFormIterator>
              <TextInput label="参数名称" source="parametername" />
              <SegmentInput label="是否必填" source="required" />
              <TextInput label="参数描述" source="description" />
              <TextInput label="示例" source="example" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label="输出数据说明">
          <RichTextInput
            toolbar={null}
            label="输出数据说明"
            source="outputexample"
          />
          <TextInput label="接口响应超时时间（ms）" source="apitimeout" />
        </FormTab>
      </TabbedForm>
    </Create>
  );
});

export const ApiShow = withStyles(editStyles)(({ classes, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="基本信息">
        <TextField label="接口ID" source="id" />
        <TextField label="接口名称" source="apiname" />
        <TextField label="接口版本" source="edition" />
        <SegmentsField label="所属应用系统" source="appname" />
        <SegmentsField label="接口协议" source="transfer" />
        <SegmentsField label="调用方式" source="requestmode" />
        <SegmentsField label="接口状态" source="cyclestatus" />
        <DateField
          label="最新修改时间"
          source="apilastmodifytime"
          type="date"
          showTime
        />
        <TextField label="最新修改人" source="apilastmodifier" />
        <TextField label="备注" source="remarks" />
      </Tab>
      <FormTab label="接口地址">
        <TextField label="接口地址" source="url" />
      </FormTab>
      <FormTab label="输入参数说明" style={{ width: "100%" }}>
        <ArrayField label="参数表" source="args">
          <Datagrid>
            <TextField label="参数名称" source="parametername" />
            <SegmentsField label="是否必填" source="required" />
            <TextField label="参数描述" source="description" />
            <TextField label="示例" source="example" />
          </Datagrid>
        </ArrayField>
      </FormTab>
      <FormTab label="输出数据说明">
        <RichTextField label="参数名称" source="outputexample" />
        <TextField label="接口响应超时时间（ms）" source="apitimeout" />
      </FormTab>
    </TabbedShowLayout>
  </Show>
));
