import React from "react";
import {
  Create,
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
  CardActions,
  CreateButton,
  RefreshButton,
  SaveButton,
  Toolbar,
  Button,
  Link
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Person";

// import FullNameField from "./FullNameField";
import SegmentsField from "./SegmentsField";
import SegmentInput from "./SegmentInput";
import SegmentsInput from "./SegmentsInput";
import MobileGrid from "./MobileGrid";

export const UserIcon = Icon;

const UserFilter = props => (
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

const UserActions = ({
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

export const UserList = withStyles(listStyles)(({ classes, ...props }) => {
  return (
    <List
      {...props}
      filters={<UserFilter />}
      sort={{ field: "userid", order: "DESC" }}
      perPage={25}
      actions={<UserActions />}
    >
      <Responsive
        xsmall={<MobileGrid />}
        medium={
          <Datagrid>
            <TextField label="用户名" source="username" />
            <TextField label="用户信息" source="userinfo" />
            <DateField
              label="创建日期"
              source="createdate"
              type="date"
              showTime
            />
            <SegmentsField label="拥有角色" />
            <TextField label="备注" source="remarks" />
            <EditButton />
          </Datagrid>
        }
      />
    </List>
  );
});

// const UserTitle = ({ record }) =>
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

const UserEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
    <Button component={Link} to={`/users`} label={"返回"} />
  </Toolbar>
);

export const UserEdit = withStyles(editStyles)(({ classes, ...props }) => (
  <Edit {...props}>
    <TabbedForm toolbar={<UserEditToolbar />}>
      <FormTab label="resources.users.tabs.editInfo">
        <TextInput
          label="用户名"
          source="username"
          formClassName={classes.first_name}
        />
        <TextInput label="用户信息" source="userinfo" />
        <SegmentsInput label="拥有角色" source="roles" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
    </TabbedForm>
  </Edit>
));

export const UserCreate = withStyles(editStyles)(({ classes, ...props }) => (
  <Create {...props}>
    <TabbedForm toolbar={<UserEditToolbar />}>
      <FormTab label="resources.users.tabs.createInfo">
        <TextInput
          label="用户名"
          source="username"
          formClassName={classes.first_name}
        />
        <TextInput label="用户信息" source="userinfo" />
        <SegmentsInput label="拥有角色" source="roles" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
    </TabbedForm>
  </Create>
));
