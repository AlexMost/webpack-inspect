import { asyncComponent } from "react-async-component";

const AsyncModulesGraphComponent = asyncComponent({
  resolve: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "ModulesGraph" */ "./component"),
});

export default AsyncModulesGraphComponent;
