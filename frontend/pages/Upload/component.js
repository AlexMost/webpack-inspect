import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/FileUpload";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import { GithubRibbon } from "../../components/Github";

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
  constructor(props) {
    super(props);
    this.state = { uploading: false };
  }
  handleFileUpload = ev => {
    this.setState({ uploading: true });
    if (ev.target.files !== null) {
      readFile(ev.target.files[0], statsData => {
        this.setState({ uploading: false });
        this.props.onStatsUploaded(statsData);
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GithubRibbon />
        <div>
          <Typography align="center" variant="headline">
            Please, upload your stats.json data
          </Typography>
          <Typography
            align="center"
            variant="caption"
            color="textSecondary"
            paragraph
          >
            webpack --profile --json > stats.json
          </Typography>
          <div className={classes.actions}>
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
          </div>
          {this.state.uploading ? <LinearProgress /> : null}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UploadComponent);
