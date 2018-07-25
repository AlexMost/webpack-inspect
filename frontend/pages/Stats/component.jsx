import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { GithubLink } from "../../components/Github";
import ModuleSearch from "../../components/ModuleSearch";
import DrawingProgress from "../../components/DrawingProgress";
import ModulesStats from "../../components/ModulesStats";
import styles from "./styles";

const StatsComponent = (props) => {
  const { classes, modules, showStats } = props;
  const hasModules = Boolean(modules.length);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {hasModules ? <ModuleSearch /> : null}
          <GithubLink />
        </Toolbar>
        <DrawingProgress />
      </AppBar>
      <main>{showStats ? <ModulesStats /> : null}</main>
    </div>
  );
};

StatsComponent.defaultProps = {
  modules: [],
  showStats: false,
};

StatsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  modules: PropTypes.arrayOf(PropTypes.object),
  showStats: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(StatsComponent);
