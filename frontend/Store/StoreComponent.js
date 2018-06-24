import React from 'react';
import { StoreContext } from "./index";
import { loadStatsData } from "../transport";
import { getClusterMap } from "../clusterize";
import { getModulesPrefixes, getShortLabel } from "../webpack-helpers";

function makeModules(statsData) {
  const clusterMap = getClusterMap(statsData.modules);
  const prefixes = getModulesPrefixes(statsData.modules, clusterMap);
  
  // TODO: implement module short name
  return statsData.modules.map((module) => {
    return {
      id: module.id,
      name: module.name,
      reasons: module.reasons,
      label: getShortLabel(module.name, prefixes),
    }
  })
}

export default class StoreComponent extends React.Component {
  constructor(props) {
    super(props);

    const onModuleChange = (moduleId) => {
      this.setState({ moduleId, selectedModuleId: moduleId });
    }

    const onSelectModule = (args) => {
      this.setState({ selectedModuleId: args.node });
    }

    const onDrawStart = () => {
      this.setState({ isDrawing: true });
    }

    const onDrawEnd = () => {
      this.setState({ isDrawing: false });
    }

    this.state = {
      modules: [],
      moduleId: null,
      isDrawing: false,
      selectedModuleId: null,
      onModuleChange,
      onSelectModule,
      onDrawStart,
      onDrawEnd,
    }

  }
  async componentDidMount() {
    const { stats: statsData } = await loadStatsData();
    const modules = makeModules(statsData);
    this.setState({ statsData, modules });
  }
  render() {
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
