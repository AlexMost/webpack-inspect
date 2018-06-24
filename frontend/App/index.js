import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import StoreComponent from "../Store/StoreComponent";
import { Layout } from "./layout";

export const App = props => {
  const { classes } = props;
  return (
    <StoreComponent>
      <CssBaseline />
      <Layout />
    </StoreComponent>
  );
};
