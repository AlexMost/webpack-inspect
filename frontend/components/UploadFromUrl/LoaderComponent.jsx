import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getQueryParam } from "../../lib/router-utils";
import { loadFromUrl } from "./loader";

class LoaderComponent extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const statsUrl = getQueryParam(location.search, "stats");
    if (statsUrl) {
      this.loadStats(statsUrl);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const statsUrl = getQueryParam(location.search, "stats");
    const prevStatsUrl = getQueryParam(prevProps.location.search, "stats");
    if (statsUrl && statsUrl !== prevStatsUrl) {
      this.loadStats(statsUrl);
    }
  }

  async loadStats(url) {
    const { onUploadStart, onUploadEnd } = this.props;
    onUploadStart();
    const data = await loadFromUrl(url);
    onUploadEnd(data, { url });
  }

  render() {
    return <noscript />;
  }
}

LoaderComponent.defaultProps = {
  onUploadStart: () => {},
  onUploadEnd: () => {},
};

LoaderComponent.propTypes = {
  location: PropTypes.object.isRequired,
  onUploadEnd: PropTypes.func,
  onUploadStart: PropTypes.func,
};

export default withRouter(LoaderComponent);
