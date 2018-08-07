/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";
import makeModules from "../../lib/modules";
import StoreContext from "./storeContext";

export class StoreComponent extends React.Component {
  constructor(props) {
    super(props);

    const onStatsDataLoaded = (statsData) => {
      const modules = makeModules(statsData);
      this.setState({ modules });
    };

    this.state = {
      modules: [],
      onStatsDataLoaded,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <StoreContext.Provider value={this.state}>
        {children}
      </StoreContext.Provider>
    );
  }
}

StoreComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StoreContext;
