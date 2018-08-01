import { asyncComponent } from "react-async-component";

const Stats = asyncComponent({
  resolve: () =>
    import(/* webpackPrefetch: true, webpackChunkName: "StatsPage" */ "./index"),
});

export default Stats;
