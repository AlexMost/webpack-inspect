import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { removeQuery } from "../lib/router-utils";

const BackButton = ({ location }) => (
  <Tooltip title="Back to stats">
    <Link
      to={{ pathname: "/stats", search: removeQuery(location.search, "mid") }}
    >
      <IconButton style={{ marginRight: "10px" }}>
        <ArrowBack style={{ color: "white" }} />
      </IconButton>
    </Link>
  </Tooltip>
);

BackButton.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(BackButton);
