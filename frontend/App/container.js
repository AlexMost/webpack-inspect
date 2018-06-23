import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreContext } from "../store";
import { loadStatsData } from "../transport";
import { getClusterMap } from "../clusterize";
import { getModulesPrefixes } from "../webpack-helpers";

export class AppContainer extends React.Component {
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
      statsData: {},
      clusterMap: {},
      modulesPrefixes: [],
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
    const clusterMap = getClusterMap(statsData.modules);
    const prefixes = getModulesPrefixes(statsData.modules, clusterMap);
    console.log(prefixes);
    this.setState({ statsData, clusterMap });
  }
  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <CssBaseline />
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
