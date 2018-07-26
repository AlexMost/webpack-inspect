import React from "react";
import StoreContext from "../App/store";
import IntegrationAutosuggest from "./component";

function makeSuggestions(modules) {
  return modules.map((module) => ({
    label: module.name,
    id: module.id,
    module,
  }));
}

const ModuleSearchWrapper = (props) => (
  <StoreContext.Consumer>
    {({ modules, onModuleChange }) => (
      <IntegrationAutosuggest
        {...props}
        modules={makeSuggestions(modules)}
        onSuggestionSelected={onModuleChange}
      />
    )}
  </StoreContext.Consumer>
);

export default ModuleSearchWrapper;
