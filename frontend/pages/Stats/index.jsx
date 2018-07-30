import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import StoreContext from "../../components/App/store";
import { getQueryParam, makeGoToUrl } from "../../lib/router-utils";
import StatsComponent from "./component";

const Stats = (props) => {
  const { location, history } = props;
  const statsUrl = getQueryParam(location.search, "stats");
  const goToUrl = makeGoToUrl(history, location);
  const onModuleSelected = (modId) => goToUrl("/inspect", { mid: modId });
  return (
    <StoreContext.Consumer>
      {(ctx) =>
        ctx.modules.length || statsUrl ? (
          <StatsComponent
            modules={ctx.modules}
            onStatsDataLoaded={ctx.onStatsDataLoaded}
            statsUrl={statsUrl}
            onModuleSelected={onModuleSelected}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    </StoreContext.Consumer>
  );
};

Stats.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Stats);
