import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "./appBar";
import { StoreContext } from "./store";
import { loadStatsData } from "./transport";

class MyApp extends React.Component {
  state = {
    statsData: {}
  }
  async componentDidMount() {
    const { stats: statsData } = await loadStatsData();
    this.setState(state => ({ statsData }));
  }
  render() {
    console.log(this.state.statsData);
    return (
      <StoreContext.Provider value={this.state}>
        <React.Fragment>
          <CssBaseline />
          <AppBar title="Deps inspector"/>
          {/* The rest of your application */}
        </React.Fragment>
      </StoreContext.Provider>
    );
  }
}

export default MyApp