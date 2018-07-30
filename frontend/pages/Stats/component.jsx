import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GithubLink } from "../../components/Github";
import ModuleSearch from "../../components/ModuleSearch";
import ModulesStats from "../../components/ModulesStats";
import styles from "./styles";

class StatsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isUploading: false };
  }

  componentDidMount() {
    const { statsUrl } = this.props;
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
    const { classes, modules, onModuleSelected } = this.props;
    const { isUploading } = this.state;
    const progress = isUploading ? (
      <LinearProgress style={{ width: "100%" }} />
    ) : null;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <ModuleSearch
              modules={modules}
              onModuleSelected={onModuleSelected}
            />
            <GithubLink />
          </Toolbar>
          {progress}
        </AppBar>
        <main>
          <ModulesStats modules={modules} onModuleClick={onModuleSelected} />
        </main>
      </div>
    );
  }
}

StatsComponent.defaultProps = {
  modules: [],
  statsUrl: "",
};

StatsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  modules: PropTypes.arrayOf(PropTypes.object),
  onModuleSelected: PropTypes.func.isRequired,
  statsUrl: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(StatsComponent);
