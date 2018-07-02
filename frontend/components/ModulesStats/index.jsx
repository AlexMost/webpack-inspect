import React from "react";
import StoreContext from "../../Store";
import Modules from "./component";

const ModulesStats = () => (
  <StoreContext.Consumer>
    {({ modules, onModuleChange }) =>
      modules.length ? (
        <Modules modules={modules} onModuleClick={onModuleChange} />
      ) : null
    }
  </StoreContext.Consumer>
);

export default ModulesStats;
