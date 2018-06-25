import React from "react";
import { StoreContext } from "./index";
import { loadStatsData } from "../lib/transport";
import { getClusterMap } from "../lib/clusterize";
import { getModulesPrefixes, getShortLabel } from "../lib/webpack-helpers";

function makeModules(statsData) {
  const clusterMap = getClusterMap(statsData.modules);
  const prefixes = getModulesPrefixes(statsData.modules, clusterMap);

  // TODO: implement module short name
  return statsData.modules.map(module => {
    return {
      id: module.id,
      name: module.name,
      reasons: module.reasons,
      label: getShortLabel(module.name, prefixes)
    };
  });
}

export default class StoreComponent extends React.Component {
  constructor(props) {
    super(props);

    const onModuleChange = moduleId => {
      this.setState({ moduleId, selectedModuleId: moduleId });
    };

    const onSelectModule = args => {
      this.setState({ selectedModuleId: args.node });
    };

    const onDrawStart = () => {
      this.setState({ isDrawing: true });
    };

    const onDrawEnd = () => {
      this.setState({ isDrawing: false });
    };

    const onStatsDataLoaded = statsData => {
      const modules = makeModules(statsData);
      this.setState({ statsData, modules });
    };

    this.state = {
      modules: [],
      moduleId: null,
      isDrawing: false,
      selectedModuleId: null,
      onModuleChange,
      onSelectModule,
      onDrawStart,
      onDrawEnd,
      onStatsDataLoaded
    };
  }
  async componentDidMount() {
    const { stats: statsData } = await loadStatsData();
    this.state.onStatsDataLoaded(statsData);
  }
  render() {
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
