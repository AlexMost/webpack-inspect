import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import StoreComponent from "../../Store/StoreComponent";

// pages
import { Inspector } from "../../pages/Inspector/index";
import { Upload } from "../../pages/Upload/index";
import { NotFound } from "../../pages/NotFound/index";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => {
  return (
    <StoreComponent>
      <CssBaseline />
      <Router basename={BASENAME}>
        <Switch>
          <Route exact path="/" component={Upload} />
          <Route path="/inspect" component={Inspector} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </StoreComponent>
  );
};
