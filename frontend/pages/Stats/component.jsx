import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getQueryParam } from "../../lib/router-utils";
import { GithubLink } from "../../components/Github";
import ModuleSearch from "../../components/ModuleSearch";
import DrawingProgress from "../../components/DrawingProgress";
import ModulesStats from "../../components/ModulesStats";
import styles from "./styles";

class StatsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isUploading: false };
  }

  componentDidMount() {
    const { location } = this.props;
    const statsUrl = getQueryParam(location.search, "stats");
    if (!statsUrl) return;
    this.loadStats(statsUrl);
  }

  loadStats = async (statsUrl) => {
    const { onStatsDataLoaded } = this.props;
    this.setState({ isUploading: true });
    const resp = await fetch(statsUrl);
    const jsonData = await resp.json();
    this.setState({ isUploading: false });
    onStatsDataLoaded(jsonData);
  };

  render() {
    const { classes, modules } = this.props;
    const { isUploading } = this.state;
    const hasModules = Boolean(modules.length);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            {hasModules ? <ModuleSearch /> : null}
            <GithubLink />
          </Toolbar>
          {isUploading ? <LinearProgress style={{ width: "100%" }} /> : null}
          <DrawingProgress />
        </AppBar>
        <main>{hasModules ? <ModulesStats /> : null}</main>
      </div>
    );
  }
}

StatsComponent.defaultProps = {
  modules: [],
};

StatsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  modules: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles, { withTheme: true })(
  withRouter(StatsComponent),
);
