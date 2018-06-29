import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GithubRibbon } from "../../components/Github";
import UploadFromUrl from "../../components/UploadFromUrl";
import UploadFromLocal from "../../components/UploadFromLocal";
import { styles } from "./styles";

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false };
  }
  onUploadStart = () => {
    this.setState({ uploading: true });
  };
  onUploadEnd = (data, opts) => {
    this.setState({ uploading: false });
    this.props.onStatsUploaded(data, opts);
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
            <UploadFromLocal
              onUploadStart={this.onUploadStart}
              onUploadEnd={this.onUploadEnd}
            />
            <UploadFromUrl
              onUploadStart={this.onUploadStart}
              onUploadEnd={this.onUploadEnd}
            />
          </div>
          {this.state.uploading ? <LinearProgress /> : null}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UploadComponent);
