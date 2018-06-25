import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import StoreComponent from "../../Store/StoreComponent";
import { Inspector } from "../../pages/Inspector/index";

export const App = () => {
  return (
    <StoreComponent>
      <CssBaseline />
      <Inspector />
    </StoreComponent>
  );
};
