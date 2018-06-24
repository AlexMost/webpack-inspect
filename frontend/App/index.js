import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { GraphToolbar } from "../GraphToolbar";
import { ModulesGraph } from "../ModulesGraph/index";
import Sidebar from "../Sidebar/index";
import { styles } from "./styles";
import StoreComponent from "../Store/StoreComponent";


const AppComponent = (props) => {
  const { classes } = props;
  return (
    <StoreComponent>
      <CssBaseline/>
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
          <Sidebar />
        </Drawer>
      </div>
    </StoreComponent>
  );
}

export const App = withStyles(styles)(AppComponent)
