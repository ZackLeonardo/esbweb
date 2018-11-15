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
  FormDataConsumer
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
          <SegmentsField label="订阅接口" source="apiname" />
          <TextField label="订阅操作人" source="operator" />
          <DateField
            label="订阅时间"
            source="subscribedate"
            type="date"
            showTime
          />
          <TextField label="订阅令牌" source="accesstoken" />
          <LinkedTo label="接口信息" source="id" />
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

// const getApisFor = appid => {
//   console.log("getApisFor: " + appid);
//   dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
//     //process.env.REACT_APP_DATA_PROVIDER
//     dataProvider => {
//       dataProvider("GET_LIST", "apis", {
//         filter: { appid: appid },
//         pagination: { page: 1, perPage: 9999 },
//         sort: { field: "id", order: "ASC" }
//       })
//         .then(response => response.data)
//         .then(items =>
//           items.map(item => {
//             return { id: item.id, name: item.apiname };
//           })
//         )
//         .then(segments => segments);
//     }
//   );
// };

// export const SubEdit = withStyles(editStyles)(({ classes, ...props }) => (
//   <Edit {...props}>
//     <TabbedForm toolbar={<SubEditToolbar />}>
//       <FormTab label="接口订阅">
//         <SegmentInput label="发起订阅APP" source="appname" />
//         <SegmentInput label="被订阅APP" source="apiappname" name="apiappname" />
//         <FormDataConsumer>
//           {({ formData, ...rest }) => (
//             <SegmentInput
//               label="订阅接口"
//               source="apiname"
//               apiappname={formData.apiappname}
//               choices={getApisFor(formData.apiappname)}
//               {...rest}
//             />
//           )}
//         </FormDataConsumer>
//       </FormTab>
//     </TabbedForm>
//   </Edit>
// ));

export class SubEdit extends React.Component {
  state = {
    appid: null
  };

  render() {
    return (
      <Edit {...this.props}>
        <TabbedForm toolbar={<SubEditToolbar />}>
          <FormTab label="接口订阅">
            <SegmentInput label="发起订阅APP" source="appid" />
            <SegmentInput label="被订阅APP" source="apiappid" />
            <FormDataConsumer>
              {({ formData, ...rest }) => {
                console.log("formData: " + formData.apiappid);
                // if (this.state.appid !== formData.apiappid) {
                //   this.setState({
                //     appid: formData.apiappid
                //   });
                // }

                return (
                  <SegmentInput
                    label="订阅接口"
                    source="id"
                    appid={formData.apiappid}
                    // yy={this.getApisFor(formData.apiappid)}
                    {...rest}
                  />
                );
              }}
            </FormDataConsumer>
          </FormTab>
        </TabbedForm>
      </Edit>
    );
  }
}

export const SubCreate = withStyles(editStyles)(({ classes, ...props }) => (
  <Create {...props}>
    <TabbedForm toolbar={<SubEditToolbar />}>
      <FormTab label="接口订阅">
        <SegmentInput label="发起订阅APP" source="appid" />
        <SegmentInput label="被订阅APP" source="apiappid" />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            console.log("formData: " + formData.apiappid);
            // if (this.state.appid !== formData.apiappid) {
            //   this.setState({
            //     appid: formData.apiappid
            //   });
            // }

            return (
              <SegmentInput
                label="订阅接口"
                source="id"
                appid={formData.apiappid}
                // yy={this.getApisFor(formData.apiappid)}
                {...rest}
              />
            );
          }}
        </FormDataConsumer>
      </FormTab>
    </TabbedForm>
  </Create>
));
