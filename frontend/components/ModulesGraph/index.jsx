import React from "react";
import { asyncComponent } from "react-async-component";
import StoreContext from "../../Store";

const AsyncModulesGraphComponent = asyncComponent({
  resolve: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "ModulesGraph" */ "./component"),
});

const ModulesGraph = () => (
  <StoreContext.Consumer>
    {ctx =>
      ctx.moduleId !== null ? (
        <AsyncModulesGraphComponent
          modules={ctx.modules}
          moduleId={ctx.moduleId}
          selectedAsset={ctx.selectedAsset}
          clusterMap={ctx.clusterMap}
          onNodeClick={ctx.onSelectModule}
          onDrawStart={ctx.onDrawStart}
          onDrawEnd={ctx.onDrawEnd}
        />
      ) : null
    }
  </StoreContext.Consumer>
);

export default ModulesGraph;
