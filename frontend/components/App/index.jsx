import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreComponent } from "./store";

// pages
import Inspector from "../../pages/Inspector/async";
import Upload from "../../pages/Upload/async";
import Stats from "../../pages/Stats/async";
import NotFound from "../../pages/NotFound/index";

const App = () => (
  <StoreComponent>
    <CssBaseline />
    <Router basename={BASENAME}>
      <Switch>
        <Route exact path="/" component={Upload} />
        <Route path="/stats" component={Stats} />
        <Route path="/inspect" component={Inspector} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </StoreComponent>
);

export default App;
