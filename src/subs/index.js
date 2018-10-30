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
import Icon from "@material-ui/icons/Flag";

import FullNameField from "./FullNameField";
import SegmentInput from "./SegmentInput";
import ApiLinkField from "./ApiLinkField";
import MobileGrid from "./MobileGrid";

export const SubIcon = Icon;

const SubFilter = props => (
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

const SubActions = ({
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

export const SubList = withStyles(listStyles)(({ classes, ...props }) => (
  <List
    {...props}
    filters={<SubFilter />}
    sort={{ field: "id", order: "DESC" }}
    perPage={25}
    actions={<SubActions />}
  >
    <Responsive
      xsmall={<MobileGrid />}
      medium={
        <Datagrid>
          <TextField label="发起订阅APP" source="appname" />
          <TextField label="订阅接口" source="apiname" />
          <TextField label="订阅操作人" source="user" />
          <ApiLinkField />
          {1 > 0 ? <EditButton /> : null}
        </Datagrid>
      }
    />
  </List>
));

const SubTitle = ({ record }) =>
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

const SubEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
    <Button component={Link} to={`/subs`} label={"返回"} />
  </Toolbar>
);

export const SubEdit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit {...props}>
    <TabbedForm toolbar={<SubEditToolbar />}>
      <FormTab label="接口订阅">
        <TextInput label="发起订阅APP" source="appname" />
        <TextInput label="订阅接口" source="apiname" />
      </FormTab>
    </TabbedForm>
  </Edit>
));

export const SubCreate = withStyles(editStyles)(({ classes, ...props }) => (
  <Create {...props}>
    <TabbedForm toolbar={<SubEditToolbar />}>
      <FormTab label="接口订阅">
        <TextInput label="发起订阅APP" source="appname" />
        <TextInput label="订阅接口" source="apiname" />
      </FormTab>
    </TabbedForm>
  </Create>
));
