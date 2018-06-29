import { asyncComponent } from "react-async-component";

const Inspector = asyncComponent({
  resolve: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "InspectorPage" */ "./index"),
});

export default Inspector;
