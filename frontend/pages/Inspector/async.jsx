import React, { lazy, Suspense } from "react";

const InspectorPage = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "InspectorPage" */ "./index"),
);

export default function Inspector() {
  return (
    <Suspense fallback={null}>
      <InspectorPage />
    </Suspense>
  );
}
