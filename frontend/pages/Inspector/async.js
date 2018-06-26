import { asyncComponent } from "react-async-component";

export const Inspector = asyncComponent({
  resolve: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "InspectorPage" */ "./index")
});
