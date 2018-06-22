import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreContext } from "../store";
import { loadStatsData } from "../transport";
import { getClusterMap } from "../clusterize";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    const onModuleChange = (moduleId) => {
      this.setState({ moduleId, selectedModuleId: moduleId });
    }

    const onSelectModule = (args) => {
      console.log('selecting module', args.node);
      this.setState({ selectedModuleId: args.node });
    }

    this.state = {
      statsData: {},
      clusterMap: {},
      moduleId: null,
      selectedModuleId: null,
      onModuleChange,
      onSelectModule,
    }

  }
  async componentDidMount() {
    const { stats: statsData } = await loadStatsData();
    const clusterMap = getClusterMap(statsData.modules);
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
