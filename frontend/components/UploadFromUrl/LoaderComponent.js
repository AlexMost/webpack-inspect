import React from "react";
import { withRouter } from "react-router-dom";
import { getQueryParam } from "../../lib/router-utils";
import { loadFromUrl } from "./loader";

class LoaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  async loadStats(url) {
    this.props.onUploadStart();
    const data = await loadFromUrl(url);
    this.props.onUploadEnd(data, { url });
  }
  componentDidUpdate(prevProps) {
    const statsUrl = getQueryParam(this.props.location.search, "stats");
    const prevStatsUrl = getQueryParam(prevProps.location.search, "stats");
    if (statsUrl && statsUrl !== prevStatsUrl) {
      this.loadStats(statsUrl);
    }
  }

  componentDidMount() {
    const statsUrl = getQueryParam(this.props.location.search, "stats");
    if (statsUrl) {
      this.loadStats(statsUrl);
    }
  }
  render() {
    return <noscript />;
  }
}

export default withRouter(LoaderComponent);
