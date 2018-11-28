import React from "react";
import { Route } from "react-router-dom";
import Configuration from "./configuration/Configuration";
import { WithPermissions } from "react-admin";

export default [
  <Route exact path="/configuration" component={Configuration} />
];
