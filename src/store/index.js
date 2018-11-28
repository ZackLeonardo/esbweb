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
  Toolbar,
  RichTextField,
  ArrayInput,
  ArrayField,
  SimpleFormIterator
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/BubbleChart"; //AddShoppingCart
import RichTextInput from "ra-input-rich-text";

import FullNameField from "./FullNameField";
import SegmentsField from "./SegmentsField";
import SegmentInput from "./SegmentInput";
import ApidetailLinkField from "./ApidetailLinkField";
import LinkedTo from "./LinkedTo";
import MobileGrid from "./MobileGrid";

export const StoreIcon = Icon;

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
    <RefreshButton />
  </CardActions>
);

export const StoreList = withStyles(listStyles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<ApiFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<ApiActions />}
    bulkActionButtons={false}
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
        </Datagrid>
      }
    />
  </List>
));

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

export const StoreShow = withStyles(editStyles)(({ classes, ...props }) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="基本信息">
        <TextField label="接口ID" source="id" />
        <TextField label="接口名称" source="apiname" />
        <TextField label="接口版本" source="edition" />
        <SegmentsField label="所属应用系统" source="appname" />
        <SegmentsField label="接口协议" source="transfer" />
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
            <TextField label="参数描述" source="description" />
            <TextField label="示例" source="example" />
          </Datagrid>
        </ArrayField>
      </FormTab>
      <FormTab label="输出数据说明">
        <RichTextField label="参数名称" source="outputexample" />
      </FormTab>
    </TabbedShowLayout>
  </Show>
));
