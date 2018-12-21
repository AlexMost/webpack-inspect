/* eslint-disable react/no-unused-state */
import React, { useState } from "react";
import PropTypes from "prop-types";
import makeModules from "../../lib/modules";

const StoreContext = React.createContext({
  modules: [],
  clusterMap: {},
  onStatsDataLoaded: () => {},
});

export function StoreComponent({ children }) {
  const [modules, setModules] = useState([]);
  const [clusterMap, setClusterMap] = useState([]);
  const onStatsDataLoaded = (statsData) => {
    const [mods, clstrMap] = makeModules(statsData);
    setModules(mods);
    setClusterMap(clstrMap);
  };
  return (
    <StoreContext.Provider value={{ modules, onStatsDataLoaded, clusterMap }}>
      {children}
    </StoreContext.Provider>
  );
}

StoreComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StoreContext;
