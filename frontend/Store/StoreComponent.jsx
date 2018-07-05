/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";
import StoreContext from "./index";
import makeModules from "../lib/modules";

export default class StoreComponent extends React.Component {
  constructor(props) {
    super(props);

    const onModuleChange = (moduleId) => {
      this.setState({ moduleId, selectedModuleId: moduleId });
    };

    const onSelectModule = (args) => {
      this.setState({ selectedModuleId: args.node });
    };

    const onDrawStart = () => {
      this.setState({ isDrawing: true });
    };

    const onDrawEnd = () => {
      this.setState({ isDrawing: false });
    };

    const onStatsDataLoaded = (statsData) => {
      const modules = makeModules(statsData);
      this.setState({
        statsData,
        modules,
        moduleId: null,
        selectedModuleId: null,
        isUploading: false,
      });
    };

    const onStatsLoadStart = () => {
      this.setState({ isUploading: true });
    };

    const onReasonSelect = (moduleId) => {
      this.setState({ focusModule: moduleId });
    };

    this.state = {
      modules: [],
      moduleId: null,
      isDrawing: false,
      isUploading: false,
      selectedModuleId: null,
      onModuleChange,
      onSelectModule,
      onDrawStart,
      onDrawEnd,
      onStatsDataLoaded,
      onReasonSelect,
      onStatsLoadStart,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <StoreContext.Provider value={this.state}>
        {children}
      </StoreContext.Provider>
    );
  }
}

StoreComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};
