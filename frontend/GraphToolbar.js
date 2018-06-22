import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ModuleSearch from "./ModuleSearch";

const styles = {
  toolbar: {
    position: "absolute",
  },
  gutters: {
    paddingRight: "8px"
  }
};

function GraphToolbarComponent(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.toolbar} position="static">
      <Toolbar
        classes={{
          gutters: classes.gutters
        }}
      >
        <ModuleSearch/>
        <IconButton onClick={props.handleArrowLeftClick}>
            <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

GraphToolbarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const GraphToolbar = withStyles(styles)(GraphToolbarComponent);
