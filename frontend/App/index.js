import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { AppContainer } from "./container";
import { GraphToolbar } from "../GraphToolbar";
import { ModulesGraph } from "../ModulesGraph/index";
import Sidebar from "../Sidebar/index";
import { styles } from "./styles";

const AppComponent = (props) => {
  const { classes } = props;
  return (
    <AppContainer>
      <div className={classes.root}>
        <GraphToolbar title="Deps inspector" />
        <main className={classes.content}>
          <ModulesGraph />
        </main>
        <Drawer
          variant="persistent"
          anchor="right"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}></div>
          <Divider />
          <Sidebar />
        </Drawer>
      </div>
    </AppContainer>
  );
}

export const App = withStyles(styles)(AppComponent)
