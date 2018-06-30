import React from "react";
import StoreContext from "../../Store";
import Modules from "./component";

const ModulesStats = () => (
  <StoreContext.Consumer>
    {({ modules }) => (modules.length ? <Modules modules={modules} /> : null)}
  </StoreContext.Consumer>
);

export default ModulesStats;
