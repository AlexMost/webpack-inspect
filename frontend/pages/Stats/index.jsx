import React from "react";
import StoreContext from "../../components/App/store";
import StatsComponent from "./component";

export default () => (
  <StoreContext.Consumer>
    {(ctx) => (
      <StatsComponent
        modules={ctx.modules}
        onStatsDataLoaded={ctx.onStatsDataLoaded}
      />
    )}
  </StoreContext.Consumer>
);
