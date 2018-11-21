import React, { lazy, Suspense } from "react";

const ModulesGraph = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "ModulesGraph" */ "./component"),
);

export default function AsyncModulesGraphComponent(props) {
  return (
    <Suspense fallback={null}>
      <ModulesGraph {...props} />
    </Suspense>
  );
}
