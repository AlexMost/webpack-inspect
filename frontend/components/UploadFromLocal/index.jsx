import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FileUpload from "@material-ui/icons/FileUpload";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import styles from "./styles";

function readFile(file, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = reader.result;
      const jsonData = JSON.parse(data);
      cb(null, jsonData);
    } catch (err) {
      cb(err);
    }
  };

  reader.readAsText(file);
}

class UploadFromLocal extends React.Component {
  handleFileUpload = (ev) => {
    const { onUploadStart, onUploadEnd, onUploadErr } = this.props;
    onUploadStart();
    if (ev.target.files !== null) {
      readFile(ev.target.files[0], (err, statsData) => {
        if (err) {
          onUploadErr(err);
        } else {
          onUploadEnd(statsData);
        }
      });
    }
  };

  render() {
    const { classes, disabled } = this.props;
    return (
      <React.Fragment>
        <input
          accept=".json"
          className={classes.input}
          id="button-file"
          onChange={this.handleFileUpload}
          type="file"
        />
        <label htmlFor="button-file">
          <Tooltip title="Upload file from the computer">
            <Button
              color="primary"
              variant="fab"
              disabled={disabled}
              component="span"
              className={classes.button}
            >
              <FileUpload />
            </Button>
          </Tooltip>
        </label>
      </React.Fragment>
    );
  }
}

UploadFromLocal.defaultProps = {
  onUploadStart: () => {},
  onUploadEnd: () => {},
  onUploadErr: () => {},
};

UploadFromLocal.propTypes = {
  onUploadStart: PropTypes.func,
  onUploadEnd: PropTypes.func,
  onUploadErr: PropTypes.func,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(UploadFromLocal);
