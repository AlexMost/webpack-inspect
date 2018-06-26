import React from "react";
import { StoreContext } from "../../Store";
import { asyncComponent } from "react-async-component";

const AsyncModulesGraphComponent = asyncComponent({
  resolve: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "ModulesGraph" */ "./component")
});

export const ModulesGraph = () => {
  return (
    <StoreContext.Consumer>
      {ctx => {
        return ctx.moduleId ? (
          <AsyncModulesGraphComponent
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
