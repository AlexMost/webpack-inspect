import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { GithubLink } from "../../components/Github";
import ModulesGraph from "../../components/ModulesGraph/index";
import ModuleSearch from "../../components/ModuleSearch";
import Sidebar from "../../components/Sidebar/index";
import DrawingProgress from "../../components/DrawingProgress";
import ModulesStats from "../../components/ModulesStats";
import styles from "./styles";

const ModulesGraphWrapper = ({ classes, open }) => (
  <React.Fragment>
    <main
      className={classNames(classes.content, classes["content-right"], {
        [classes.contentShift]: open,
        [classes[`contentShift-right`]]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      <ModulesGraph />
    </main>
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Sidebar />
    </Drawer>
  </React.Fragment>
);

ModulesGraphWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

const ModulesStatsWrapper = ({ classes }) => (
  <main>
    <div className={classes.drawerHeader} />
    <ModulesStats />
  </main>
);

ModulesStatsWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const InspectorComponent = (props) => {
  const { classes, open, modules, showStats } = props;
  const hasModules = Boolean(modules.length);
  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes["appBarShift-right"]]: open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            {hasModules ? <ModuleSearch /> : null}
            <GithubLink />
          </Toolbar>
          <DrawingProgress />
        </AppBar>
        {showStats ? (
          <ModulesStatsWrapper classes={classes} />
        ) : (
          <ModulesGraphWrapper open={open} classes={classes} />
        )}
      </div>
    </div>
  );
};

InspectorComponent.defaultProps = {
  modules: [],
  open: false,
  showStats: false,
};

InspectorComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  modules: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
  showStats: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(InspectorComponent);
