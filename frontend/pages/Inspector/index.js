import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { StoreContext } from "../../Store";
import InspectorComponent from "./component";

export default withRouter(props => {
  return (
    <StoreContext.Consumer>
      {ctx =>
        ctx.modules.length ? (
          <InspectorComponent open={Boolean(ctx.moduleId)} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    </StoreContext.Consumer>
  );
});
