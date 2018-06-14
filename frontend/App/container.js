import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StoreContext } from "../store";
import { loadStatsData } from "../transport";

export class AppContainer extends React.Component {
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
        <CssBaseline />
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
