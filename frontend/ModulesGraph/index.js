import React from "react";
import { StoreContext } from "../store";
import { VisGraph } from "./VisGraph";


export const ModulesGraph = () => {
  return (
    <StoreContext.Consumer>
      {ctx => {
        return ctx.moduleId ? (
          <VisGraph
            modules={ctx.modules}
            moduleId={ctx.moduleId}
            selectedAsset={ctx.selectedAsset}
            clusterMap={ctx.clusterMap}
            onNodeClick={ctx.onSelectModule}
            onDrawStart={ctx.onDrawStart}
            onDrawEnd={ctx.onDrawEnd}
          />
        ) : null;
      }}
    </StoreContext.Consumer>
  );
};
