import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { GithubLink } from "../../components/Github";
import BackButton from "../../components/BackBtn";
import ModulesGraph from "../../components/ModulesGraph/index";
import ModuleSearch from "../../components/ModuleSearch";
import Sidebar from "../../components/Sidebar/index";
import DrawingProgress from "../../components/DrawingProgress";
import styles from "./styles";

class InspectorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModuleId: null,
    };
  }

  onGraphModuleSelect = (selectedNode) => {
    console.log(selectedNode);
  };

  render() {
    const { classes, modules, onModuleSelected, moduleId } = this.props;
    const { selectedModuleId } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: true,
              [classes["appBarShift-right"]]: true,
            })}
          >
            <Toolbar className={classes.toolbar}>
              <BackButton />
              <ModuleSearch
                modules={modules}
                onModuleSelected={onModuleSelected}
              />
              <GithubLink />
            </Toolbar>
            <DrawingProgress />
          </AppBar>
          <main
            className={classNames(classes.content, classes["content-right"], {
              [classes.contentShift]: true,
              [classes[`contentShift-right`]]: true,
            })}
          >
            <div className={classes.drawerHeader} />
            <ModulesGraph
              moduleId={moduleId}
              modules={modules}
              onNodeClick={this.onGraphModuleSelect}
            />
          </main>
          <Drawer
            variant="persistent"
            anchor="right"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Sidebar
              modules={modules}
              selectedModuleId={selectedModuleId || moduleId}
            />
          </Drawer>
        </div>
      </div>
    );
  }
}

InspectorComponent.defaultProps = {
  modules: [],
};

InspectorComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  modules: PropTypes.arrayOf(PropTypes.object),
  moduleId: PropTypes.string.isRequired,
  onModuleSelected: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(InspectorComponent);
