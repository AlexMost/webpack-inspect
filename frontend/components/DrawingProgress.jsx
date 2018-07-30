import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import StoreContext from "./App/store";

const DrawingProgress = () => (
  <StoreContext.Consumer>
    {(ctx) =>
      ctx.isDrawing || ctx.isUploading ? (
        <LinearProgress style={{ width: "100%" }} />
      ) : null
    }
  </StoreContext.Consumer>
);

export default DrawingProgress;
