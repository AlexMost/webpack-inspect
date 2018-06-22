import React from "react";
import { StoreContext } from "../store";
import { VisGraph } from "./VisGraph";

export const ModulesGraph = (props) => {
  return (
    <StoreContext.Consumer>
      {ctx => {
        return ctx.moduleId ? (
          <VisGraph
            statsData={ctx.statsData}
            moduleId={ctx.moduleId}
            selectedAsset={ctx.selectedAsset}
            clusterMap={ctx.clusterMap}
            onNodeClick={ctx.onSelectModule}
          />
        ) : null;
      }}
    </StoreContext.Consumer>
  );
};
