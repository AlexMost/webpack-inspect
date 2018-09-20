import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const UploadError = ({ message }) => (
  <Typography color="error">{message}</Typography>
);

UploadError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default UploadError;
