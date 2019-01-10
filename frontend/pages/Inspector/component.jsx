import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { GithubLink } from "../../components/Github";
import BackButton from "../../components/BackBtn";
import ModulesGraph from "../../components/ModulesGraph/index";
import ModuleSearch from "../../components/ModuleSearch";
import Sidebar from "../../components/Sidebar/index";
import styles from "./styles";

class InspectorComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedModuleId: null,
      isGrouped: false,
    };
  }

  onGraphModuleSelect = (selectedNode) => {
    this.setState({ selectedModuleId: selectedNode.node });
  };

  render() {
    const {
      classes,
      modules,
      onModuleSelected,
      moduleId,
      clusterMap,
    } = this.props;
    const { selectedModuleId, isGrouped } = this.state;
    const currentModule = modules.find(({ id }) => id === moduleId);
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <BackButton />
              <ModuleSearch
                modules={modules}
                onModuleSelected={onModuleSelected}
                inputValue={currentModule.name}
              />
              <GithubLink />
            </Toolbar>
          </AppBar>
          <main className={classes.container}>
            <ModulesGraph
              isGrouped={isGrouped}
              moduleId={moduleId}
              modules={modules}
              clusterMap={clusterMap}
              onNodeClick={this.onGraphModuleSelect}
            />
          </main>
        </div>
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
            onGroupingToggle={(isGroupingEnabled) =>
              this.setState({ isGrouped: isGroupingEnabled })
            }
          />
        </Drawer>
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
  clusterMap: PropTypes.object.isRequired,
  moduleId: PropTypes.string.isRequired,
  onModuleSelected: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(InspectorComponent);
