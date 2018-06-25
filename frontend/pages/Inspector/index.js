import React from "react";
import { StoreContext } from "../../Store";
import InspectorComponent from "./component";


export const Inspector = (props) => {
  return (
    <StoreContext.Consumer>
      {ctx => <InspectorComponent open={Boolean(ctx.moduleId)} {...props} />}
    </StoreContext.Consumer>
  );
};
