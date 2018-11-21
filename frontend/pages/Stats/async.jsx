import React, { lazy, Suspense } from "react";

const StatsPage = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "StatsPage" */ "./index"),
);

export default function StatsPageAsync(props) {
  return (
    <Suspense fallback={null}>
      <StatsPage {...props} />
    </Suspense>
  );
}
