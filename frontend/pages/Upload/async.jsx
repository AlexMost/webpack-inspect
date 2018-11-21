import React, { lazy, Suspense } from "react";

const UploadPage = lazy(() =>
  import(/* webpackChunkName: "UploadPage" */ "./index"),
);

export default function UploadPageAsync(props) {
  return (
    <Suspense fallback={null}>
      <UploadPage {...props} />
    </Suspense>
  );
}
