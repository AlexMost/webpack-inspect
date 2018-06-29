import React from "react";
import UploadComponent from "./component";
import { withRouter } from "react-router-dom";
import { StoreContext } from "../../Store";
import { addQuery } from "../../lib/router-utils";

export default withRouter(props => {
  return (
    <StoreContext.Consumer>
      {ctx => (
        <UploadComponent
          onStatsUploaded={(data, opts) => {
            ctx.onStatsDataLoaded(data);
            const historyObj = {
              pathname: "/inspect"
            };
            if (opts && opts.url) {
              historyObj.search = addQuery(
                props.history.location.search,
                "stats",
                opts.url
              );
            }
            props.history.push(historyObj);
          }}
        />
      )}
    </StoreContext.Consumer>
  );
});
