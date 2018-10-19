import React from "react";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { translate, Title } from "react-admin";

import LinkToRelatedCustomers from "./LinkToRelatedCustomers";
import roles from "./data";

export default translate(({ translate }) => (
  <Card>
    <Title title={translate("resources.roleSegments.name")} />
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {translate("resources.roleSegments.fields.name")}
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {roles.map(segment => (
          <TableRow key={segment.id}>
            <TableCell>{translate(segment.name)}</TableCell>
            <TableCell>
              <LinkToRelatedCustomers segment={segment.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
));
