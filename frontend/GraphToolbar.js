import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ModuleSearch from "./ModuleSearch";
import LinearProgress from '@material-ui/core/LinearProgress';
import { StoreContext } from "./Store";

const styles = {
  toolbar: {
    position: "absolute",
  }
};

const Spinner = () => {
  return (
    <StoreContext.Consumer>
      {
        (ctx) => {
          return ctx.isDrawing ? <LinearProgress/> : null;
        }
      }
    </StoreContext.Consumer>
  )
}

function GraphToolbarComponent(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.toolbar} position="static">
      <Toolbar>
        <ModuleSearch/>
     </Toolbar>
     <Spinner/>
    </AppBar>
  );
}

GraphToolbarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const GraphToolbar = withStyles(styles)(GraphToolbarComponent);
