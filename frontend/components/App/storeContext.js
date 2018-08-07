import React from "react";

const StoreContext = React.createContext({
  modules: [],
  onStatsDataLoaded: () => {},
});

export default StoreContext;
