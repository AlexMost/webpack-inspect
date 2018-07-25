import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import StoreContext from "../../Store";
import StatsComponent from "./component";
import { getQueryParam } from "../../lib/router-utils";
import LoaderComponent from "../../components/UploadFromUrl/LoaderComponent";

const StatsPage = withRouter((props) => {
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
            <StatsComponent
              open={ctx.moduleId !== null}
              modules={ctx.modules}
              showStats={ctx.moduleId === null}
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

export default StatsPage;
