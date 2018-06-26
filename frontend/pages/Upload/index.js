import React from "react";
import UploadComponent from "./component";
import { withRouter } from "react-router-dom";
import { StoreContext } from "../../Store";

export default withRouter(props => {
  return (
    <StoreContext.Consumer>
      {ctx => (
        <UploadComponent
          onStatsUploaded={data => {
            ctx.onStatsDataLoaded(data);
            props.history.push("/inspect");
          }}
        />
      )}
    </StoreContext.Consumer>
  );
});
