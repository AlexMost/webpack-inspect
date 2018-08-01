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

const ModuleSearchWrapper = ({ modules, onModuleSelected, inputValue }) => {
  if (!modules.length) return null;
  return (
    <IntegrationAutosuggest
      modules={makeSuggestions(modules)}
      onSuggestionSelected={onModuleSelected}
      inputValue={inputValue}
    />
  );
};

ModuleSearchWrapper.defaultProps = {
  inputValue: "",
};

ModuleSearchWrapper.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModuleSelected: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
};

export default ModuleSearchWrapper;
