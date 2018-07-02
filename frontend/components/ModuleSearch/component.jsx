import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(
          (part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            ),
        )}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value, modules) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const suggestions = [];
  if (inputLength === 0) {
    return [];
  }
  let count = 0;
  for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    if (mod.label.toLowerCase().indexOf(inputValue) !== -1 && count < 10) {
      suggestions.push(mod);
      count++;
    }
  }
  return suggestions;
}

class IntegrationAutosuggest extends React.Component {
  state = {
    value: "",
    suggestions: [],
  };

  componentDidMount() {
    this.input.focus();
  }

  storeInputReference = (autosuggest) => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const { modules } = this.props;
    this.setState({
      suggestions: getSuggestions(value, modules),
    });
  };

  handleSuggestionSelected = (event, args) => {
    const { onSuggestionSelected } = this.props;
    onSuggestionSelected(args.suggestion.id);
  };

  render() {
    const { classes } = this.props;
    const { suggestions, value } = this.state;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        ref={this.storeInputReference}
        inputProps={{
          classes,
          placeholder: "Search and select module for the inspection",
          value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
