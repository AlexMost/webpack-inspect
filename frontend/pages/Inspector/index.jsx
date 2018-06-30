import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import StoreContext from "../../Store";
import InspectorComponent from "./component";
import { getQueryParam } from "../../lib/router-utils";
import LoaderComponent from "../../components/UploadFromUrl/LoaderComponent";

const InspectorPage = withRouter((props) => {
  const { location } = props;
  const statsUrl = getQueryParam(location.search, "stats");
  return (
    <StoreContext.Consumer>
      {(ctx) =>
        ctx.modules.length || statsUrl ? (
          <React.Fragment>
            <LoaderComponent
              onUploadStart={ctx.onStatsLoadStart}
              onUploadEnd={ctx.onStatsDataLoaded}
            />
            <InspectorComponent
              open={ctx.moduleId !== null}
              modules={ctx.modules}
              {...props}
            />
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    </StoreContext.Consumer>
  );
});

export default InspectorPage;
