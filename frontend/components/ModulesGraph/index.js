import React from "react";
import { StoreContext } from "../../Store";
import ModulesGraphComponent from "./component";

export const ModulesGraph = () => {
  return (
    <StoreContext.Consumer>
      {ctx => {
        return ctx.moduleId ? (
          <ModulesGraphComponent
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
