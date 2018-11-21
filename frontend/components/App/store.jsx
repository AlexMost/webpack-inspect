/* eslint-disable react/no-unused-state */
import React, { useState } from "react";
import PropTypes from "prop-types";
import makeModules from "../../lib/modules";

const StoreContext = React.createContext({
  modules: [],
  onStatsDataLoaded: () => {},
});

export function StoreComponent({ children }) {
  const [modules, setModules] = useState([]);
  const onStatsDataLoaded = (statsData) => setModules(makeModules(statsData));
  return (
    <StoreContext.Provider value={{ modules, onStatsDataLoaded }}>
      {children}
    </StoreContext.Provider>
  );
}

StoreComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StoreContext;
