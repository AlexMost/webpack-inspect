import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "./AppBar";
import { StoreContext } from "./store";
import { loadStatsData } from "./transport";
import { ModuleGraph } from "./Graph";

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    const onModuleChange = (moduleId) => {
      this.setState({ moduleId });
    }
    const onAssetSelect = (selectedAsset) => {
      console.log('Selecting asset', selectedAsset);
      this.setState({ selectedAsset });
    }
    this.state = {
      statsData: {},
      moduleId: null,
      selectedAsset: null,
      onAssetSelect,
      onModuleChange,
    }

  }
  async componentDidMount() {
    const { stats: statsData } = await loadStatsData();
    this.setState({ statsData });
  }
  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <React.Fragment>
          <CssBaseline />
          <AppBar title="Deps inspector"/>
          <ModuleGraph/>
        </React.Fragment>
      </StoreContext.Provider>
    );
  }
}

export default MyApp