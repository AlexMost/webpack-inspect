import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/FileUpload";

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

class UploadComponent extends React.Component {
  handleFileUpload = ev => {
    if (ev.target.files !== null) {
      readFile(ev.target.files[0], statsData => {
        this.props.onStatsUploaded(statsData);
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <input
          accept=".json"
          className={classes.input}
          id="button-file"
          onChange={this.handleFileUpload}
          type="file"
        />
        <label htmlFor="button-file">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            Upload
            <FileUpload className={classes.rightIcon} />
          </Button>
        </label>
      </div>
    );
  }
}

export default withStyles(styles)(UploadComponent);
