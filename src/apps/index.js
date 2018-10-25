import React from "react";
import {
  Create,
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
  Toolbar
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Apps";

import NbItemsField from "../commands/NbItemsField";
import ProductReferenceField from "../products/ProductReferenceField";
import StarRatingField from "../reviews/StarRatingField";
import FullNameField from "./FullNameField";
import SegmentsField from "./SegmentsField";
import SegmentInput from "./SegmentInput";
import SegmentsInput from "./SegmentsInput";
import CustomerLinkField from "./CustomerLinkField";
import MobileGrid from "./MobileGrid";

export const AppIcon = Icon;

const AppFilter = props => (
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

const AppActions = ({
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
    <RefreshButton label="同步" />
  </CardActions>
);

export const AppList = withStyles(listStyles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<AppFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<AppActions />}
  >
    <Responsive
      xsmall={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField label="应用系统ID" source="appid" />
          <TextField label="应用系统名称" source="appname" />
          <TextField label="应用系统状态" source="appstatus" />
          <SegmentsField label="发布管理" source="apimanager" />
          <TextField label="备注" source="remarks" />
          <Link to={`/users`} label={"接口信息"}>
            接口信息
          </Link>
          {1 > 0 ? <EditButton /> : null}
        </Datagrid>
      }
    />
  </List>
));

const AppTitle = ({ record }) =>
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

const AppEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
    <Button component={Link} to={`/apps`} label={"返回"} />
  </Toolbar>
);

export const AppEdit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit {...props}>
    <TabbedForm toolbar={<AppEditToolbar />}>
      <FormTab label="resources.apps.tabs.editInfo">
        <TextField label="应用系统ID" source="appid" />
        <TextField label="应用系统名称" source="appname" />
        <TextField label="应用系统状态" source="appstatus" />
        <SegmentsInput label="发布管理" source="apimanager" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
    </TabbedForm>
  </Edit>
));
