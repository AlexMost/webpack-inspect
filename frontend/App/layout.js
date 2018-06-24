import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { ModulesGraph } from "../ModulesGraph/index";
import ModuleSearch from "../ModuleSearch";
import Sidebar from "../Sidebar/index";
import { StoreContext } from "../Store";
import { DrawingProgress } from "../ModulesGraph/DrawingProgress";
import { styles } from "./styles";

class LayoutComponent extends React.Component {
  render() {
    const { classes, open } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes["appBarShift-right"]]: open
            })}
          >
            <Toolbar>
              <ModuleSearch />
            </Toolbar>
          </AppBar>
          <main
            className={classNames(classes.content, classes["content-right"], {
              [classes.contentShift]: open,
              [classes[`contentShift-right`]]: open
            })}
          >
            {/* <div className={classes.drawerHeader} /> */}
            {/* <DrawingProgress /> */}
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
  }
}

LayoutComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool
};

export const Layout = withStyles(styles, { withTheme: true })(props => {
  return (
    <StoreContext.Consumer>
      {ctx => <LayoutComponent open={Boolean(ctx.moduleId)} {...props} />}
    </StoreContext.Consumer>
  );
});
