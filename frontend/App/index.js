import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { AppContainer } from "./container";
import { GraphToolbar } from "../GraphToolbar";
import { ModulesGraph } from "../ModulesGraph/index";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Sidebar from "../Sidebar/index";
import { styles } from "./styles";

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <AppContainer>
        <div className={classes.root}>
          <GraphToolbar
            title="Deps inspector"
            handleArrowLeftClick={this.handleDrawerOpen}
          />
          <main className={classes.content}>
            <ModulesGraph />
          </main>
          <Drawer
            variant="persistent"
            anchor="right"
            open={this.state.open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider />
            <Sidebar />
          </Drawer>
        </div>
      </AppContainer>
    );
  }
}

export const App = withStyles(styles)(AppComponent)
