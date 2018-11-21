import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import StoreContext from "../../components/App/store";
import InspectorComponent from "./component";
import { getQueryParam, makeGoToUrl } from "../../lib/router-utils";

function hasModuleId(modules, moduleId) {
  return modules.find(({ id }) => moduleId === id);
}

const InspectorPage = withRouter((props) => {
  const { location, history } = props;
  const statsUrl = getQueryParam(location.search, "stats");
  const moduleId = getQueryParam(location.search, "mid");
  const goToUrl = makeGoToUrl(history, location);
  const onModuleSelected = (modId) => goToUrl("/inspect", { mid: modId });
  const ctx = useContext(StoreContext);
  const hasModules = Boolean(ctx.modules.length);
  const validId = hasModuleId(ctx.modules, moduleId);

  if (
    (!hasModules && statsUrl) ||
    (hasModules && !moduleId) ||
    (hasModules && !validId)
  ) {
    return (
      <Redirect
        to={{
          pathname: "/stats",
          search: location.search,
        }}
      />
    );
  }

  if (!hasModules || !validId) {
    return <Redirect to="/" />;
  }

  return (
    <InspectorComponent
      modules={ctx.modules}
      moduleId={moduleId}
      onModuleSelected={onModuleSelected}
    />
  );
});

export default InspectorPage;
