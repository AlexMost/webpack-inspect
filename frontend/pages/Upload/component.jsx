import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GithubRibbon } from "../../components/Github";
import UploadFromUrl from "../../components/UploadFromUrl";
import UploadFromLocal from "../../components/UploadFromLocal";
import UploadError from "../../components/UploadError";
import styles from "./styles";

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false };
    this.uploadError = null;
  }

  onUploadStart = () => {
    this.setState({ uploading: true, uploadError: null });
  };

  onUploadEnd = (data, opts) => {
    const { onStatsUploaded } = this.props;
    this.setState({ uploading: false });
    onStatsUploaded(data, opts);
  };

  onUploadErr = (err) => {
    console.error(err.message);
    console.error(err.stack);
    this.setState({ uploadError: err });
  };

  render() {
    const { classes, onUrl } = this.props;
    const { uploading, uploadError } = this.state;
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
            webpack --profile --json &gt; stats.json
          </Typography>
          <div className={classes.actions}>
            <UploadFromLocal
              onUploadStart={this.onUploadStart}
              onUploadErr={this.onUploadErr}
              onUploadEnd={this.onUploadEnd}
              disabled={uploading}
            />
            <UploadFromUrl onUrl={onUrl} disabled={uploading} />
          </div>
          {uploading ? <LinearProgress /> : null}
          {uploadError ? (
            <UploadError message="Failed to upload file. Probably something is wrong with the format" />
          ) : null}
        </div>
      </div>
    );
  }
}

UploadComponent.defaultProps = {
  onUrl: () => {},
  onStatsUploaded: () => {},
};

UploadComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  onUrl: PropTypes.func,
  onStatsUploaded: PropTypes.func,
};

export default withStyles(styles)(UploadComponent);
