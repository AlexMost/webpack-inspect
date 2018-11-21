import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import StoreContext from "../../components/App/store";
import { getQueryParam, makeGoToUrl } from "../../lib/router-utils";
import StatsComponent from "./component";

const Stats = (props) => {
  const { location, history } = props;
  const statsUrl = getQueryParam(location.search, "stats");
  const moduleId = getQueryParam(location.search, "mid");
  const goToUrl = makeGoToUrl(history, location);
  const onModuleSelected = (modId) => goToUrl("/inspect", { mid: modId });
  const ctx = useContext(StoreContext);
  return ctx.modules.length || statsUrl ? (
    <StatsComponent
      modules={ctx.modules}
      moduleId={moduleId}
      onStatsDataLoaded={ctx.onStatsDataLoaded}
      statsUrl={statsUrl}
      onModuleSelected={onModuleSelected}
    />
  ) : (
    <Redirect to="/" />
  );
};

Stats.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Stats);
