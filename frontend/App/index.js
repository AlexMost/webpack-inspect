import React from "react";
import { AppContainer } from "./container";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GraphToolbar } from "../GraphToolbar";
import { ModulesGraph } from "../ModulesGraph/index";
import Sidebar from "../Sidebar/index";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100vh',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export const App = withStyles(styles)((props) => {
  const { classes } = props;
  return (
    <AppContainer>
      <GraphToolbar title="Deps inspector" />
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={9}>
            <ModulesGraph />
          </Grid>
          <Grid item xs={3}>
            <Sidebar/>
          </Grid>
        </Grid>
      </div>
    </AppContainer>
  );
});
