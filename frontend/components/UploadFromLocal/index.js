import React from "react";

import { withStyles } from "@material-ui/core/styles";
import FileUpload from "@material-ui/icons/FileUpload";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { styles } from "./styles";

function readFile(file, cb) {
  const reader = new FileReader();
  reader.onload = e => {
    const data = reader.result;
    const jsonData = JSON.parse(data);
    cb(jsonData);
  };

  reader.readAsText(file);
}

class UploadFromLocal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false };
  }

  handleFileUpload = ev => {
    this.props.onUploadStart();
    if (ev.target.files !== null) {
      readFile(ev.target.files[0], statsData => {
        this.props.onUploadEnd(statsData);
      });
    }
  };

  render() {
    const { classes } = this.props;
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
              disabled={this.state.uploading}
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

export default withStyles(styles)(UploadFromLocal);
