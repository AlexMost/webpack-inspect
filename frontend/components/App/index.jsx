import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StoreComponent from "../../Store/StoreComponent";

// pages
import Inspector from "../../pages/Inspector/async";
import Upload from "../../pages/Upload/async";
import NotFound from "../../pages/NotFound/index";

const App = () => (
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

export default App;
