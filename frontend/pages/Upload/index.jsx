import React from "react";
import { withRouter } from "react-router-dom";
import UploadComponent from "./component";
import StoreContext from "../../Store";
import { addQuery } from "../../lib/router-utils";

export default withRouter(({ location, history }) => (
  <StoreContext.Consumer>
    {(ctx) => (
      <UploadComponent
        onStatsUploaded={(data) => {
          ctx.onStatsDataLoaded(data);
          const historyObj = {
            pathname: "/inspect",
            search: location.search,
          };
          history.push(historyObj);
        }}
        onUrl={(url) => {
          const historyObj = {
            pathname: "/inspect",
            search: addQuery(location.search, "stats", url),
          };
          history.push(historyObj);
        }}
      />
    )}
  </StoreContext.Consumer>
));
