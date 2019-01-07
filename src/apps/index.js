import React from "react";
import {
  Datagrid,
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
  Toolbar
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Apps";
// import { stringify } from "query-string";
// import get from "lodash/get";

// import FullNameField from "./FullNameField";
import SegmentsField from "./SegmentsField";
import SegmentsInput from "./SegmentsInput";
import MobileGrid from "./MobileGrid";
import LinkedTo from "./LinkedTo";
import dataProviderFactory from "../dataProvider";

export const AppIcon = Icon;

const hasRole = arg => {
  let roles = localStorage.getItem("role");
  return roles.indexOf(arg) > -1;
};

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
    <RefreshButton label="刷新" />
    {hasRole("sysAdmin") ? (
      <Button
        label="同步"
        onClick={() =>
          dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
            dataProvider =>
              dataProvider("GET_LIST", "appsUpdate", {
                // filter: { isUpdate: ture },
                pagination: { page: 1, perPage: 25 },
                sort: { field: "appid", order: "ASC" }
              })
          )
        }
      />
    ) : null}
  </CardActions>
);

const renderEditbutton = () => {
  if (hasRole("sysAdmin")) {
    return <EditButton />;
  }
  return null;
};

export const AppList = withStyles(listStyles)(
  ({ classes, record, dataProvider, ...props }) => (
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
            <TextField label="应用系统状态" source="status" />
            <SegmentsField label="发布管理" source="apimanager" />
            <TextField label="备注" source="remarks" />
            <LinkedTo label="接口发布" source="appid" />
            {renderEditbutton()}
          </Datagrid>
        }
      />
    </List>
  )
);

// const AppTitle = ({ record }) =>
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
        <TextField label="应用系统状态" source="status" />
        <SegmentsInput label="发布管理" source="apimanager" />
        <TextInput label="备注" source="remarks" />
      </FormTab>
    </TabbedForm>
  </Edit>
));
