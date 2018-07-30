import React from "react";
import PropTypes from "prop-types";
import IntegrationAutosuggest from "./component";

function makeSuggestions(modules) {
  return modules.map((module) => ({
    label: module.name,
    id: module.id,
    module,
  }));
}

const ModuleSearchWrapper = ({ modules, onModuleSelected }) => {
  if (!modules.length) return null;
  return (
    <IntegrationAutosuggest
      modules={makeSuggestions(modules)}
      onSuggestionSelected={onModuleSelected}
    />
  );
};

ModuleSearchWrapper.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModuleSelected: PropTypes.func.isRequired,
};

export default ModuleSearchWrapper;
