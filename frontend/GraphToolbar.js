import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ModuleSearch from "./ModuleSearch";
import AssetsSelect from "./AssetSelect";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  toolbar: {
    marginBottom: 8
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function GraphToolbarComponent(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.toolbar} position="static">
        <Toolbar>
          <ModuleSearch/>
          <AssetsSelect/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

GraphToolbarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const GraphToolbar = withStyles(styles)(GraphToolbarComponent);
