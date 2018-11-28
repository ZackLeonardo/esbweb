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
  FormDataConsumer,
  SelectInput,
  SimpleForm
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Flag";

import FullNameField from "./FullNameField";
import SegmentInput from "./SegmentInput";
import LinkedTo from "./LinkedTo";
import MobileGrid from "./MobileGrid";
import dataProviderFactory from "../dataProvider";
import SegmentsField from "./SegmentsField";

export const SubIcon = Icon;

const SubFilter = props => (
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
          <SegmentsField label="发起订阅APP" source="appname" />
          <SegmentsField label="被订阅APP" source="apiappname" />
          <TextField label="订阅接口ID" source="apiid" />
          <SegmentsField label="订阅接口" source="apiname" />
          <TextField label="订阅操作人" source="operator" />
          <DateField
            label="订阅时间"
            source="subscribedate"
            type="date"
            showTime
          />
          <TextField label="订阅令牌" source="accesstoken" />
          <LinkedTo label="接口信息" source="apiid" />
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

export class SubEdit extends React.Component {
  state = {
    apiSegments: null
  };

  componentDidMount = () => {
    dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
      //process.env.REACT_APP_DATA_PROVIDER
      dataProvider => {
        dataProvider("GET_LIST", "apis", {
          // filter: { appid: this.state.appid },
          pagination: { page: 1, perPage: 9999 },
          sort: { field: "id", order: "ASC" },
          flag: "1"
        })
          .then(response => response.data)
          .then(
            items => {
              let apiSegments = new Map();
              for (let item of items) {
                if (!apiSegments[item.appid]) {
                  apiSegments[item.appid] = [];
                }
                apiSegments[item.appid].push({
                  id: item.id,
                  name: item.apiname
                });
              }

              this.setState({
                apiSegments: apiSegments
              });
            }
            // items.foreach(item => {

            // return { id: item.id, name: item.apiname };
            // })
          );
      }
    );
  };

  getApisFor(appid) {
    return this.state.apiSegments ? this.state.apiSegments[appid] : [];
  }

  render() {
    return (
      <Edit {...this.props}>
        <SimpleForm label="接口订阅" toolbar={<SubEditToolbar />}>
          <SegmentInput label="发起订阅APP" source="appid" />
          <SegmentInput label="被订阅APP" source="apiappid" />
          <FormDataConsumer>
            {({ formData, getSource, ...rest }) => {
              return (
                <SelectInput
                  label="订阅接口"
                  source="apiid"
                  choices={this.getApisFor(formData.apiappid)}
                  // appid={formData.apiappid}
                  // yy={this.getApisFor(formData.apiappid)}
                  {...rest}
                />
              );
            }}
          </FormDataConsumer>
        </SimpleForm>
      </Edit>
    );
  }
}

export class SubCreate extends React.Component {
  state = {
    apiSegments: null
  };

  componentWillMount = () => {
    dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
      //process.env.REACT_APP_DATA_PROVIDER
      dataProvider => {
        dataProvider("GET_LIST", "apis", {
          // filter: { appid: this.state.appid },
          pagination: { page: 1, perPage: 9999 },
          sort: { field: "id", order: "ASC" },
          flag: "1"
        })
          .then(response => response.data)
          .then(
            items => {
              let apiSegments = new Map();
              for (let item of items) {
                if (!apiSegments[item.appid]) {
                  apiSegments[item.appid] = [];
                }
                apiSegments[item.appid].push({
                  id: item.id,
                  name: item.apiname
                });
              }

              this.setState({
                apiSegments: apiSegments
              });
            }
            // items.foreach(item => {

            // return { id: item.id, name: item.apiname };
            // })
          );
      }
    );
  };

  getApisFor(appid) {
    return this.state.apiSegments ? this.state.apiSegments[appid] : [];
  }

  render() {
    return (
      <Create {...this.props}>
        <TabbedForm toolbar={<SubEditToolbar />}>
          <FormTab label="接口订阅">
            <SegmentInput label="发起订阅APP" source="appid" />
            <SegmentInput label="被订阅APP" source="apiappid" />
            <FormDataConsumer>
              {({ formData, getSource, ...rest }) => {
                return (
                  <SelectInput
                    label="订阅接口"
                    source="apiid"
                    choices={this.getApisFor(formData.apiappid)}
                    // appid={formData.apiappid}
                    // yy={this.getApisFor(formData.apiappid)}
                    {...rest}
                  />
                );
              }}
            </FormDataConsumer>
          </FormTab>
        </TabbedForm>
      </Create>
    );
  }
}
