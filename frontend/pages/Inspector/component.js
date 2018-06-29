import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { GithubLink } from "../../components/Github";
import { ModulesGraph } from "../../components/ModulesGraph/index";
import ModuleSearch from "../../components/ModuleSearch";
import Sidebar from "../../components/Sidebar/index";
import { DrawingProgress } from "../../components/DrawingProgress";
import { styles } from "./styles";

const InspectorComponent = props => {
  const { classes, open, modules } = props;
  const hasModules = Boolean(modules.length);
  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes["appBarShift-right"]]: open
          })}
        >
          <Toolbar className={classes.toolbar}>
            {hasModules ? <ModuleSearch /> : null}
            <GithubLink />
          </Toolbar>
          <DrawingProgress />
        </AppBar>
        <main
          className={classNames(classes.content, classes["content-right"], {
            [classes.contentShift]: open,
            [classes[`contentShift-right`]]: open
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
            paper: classes.drawerPaper
          }}
        >
          <Sidebar />
        </Drawer>
      </div>
    </div>
  );
};

InspectorComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(InspectorComponent);
