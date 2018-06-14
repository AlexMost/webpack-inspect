import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "./appBar";
import { StoreContext } from "./store";
import { loadStatsData } from "./transport";
import { ModuleGraph } from "./graph";

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    const onModuleChange = (moduleId) => {
      this.setState({ moduleId });
    }
    this.state = {
      statsData: {},
      moduleId: null,
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