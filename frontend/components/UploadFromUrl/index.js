import React from "react";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import UrlModal from "./UrlModal";

async function fetchRemoteJSON(url) {
  const resp = await fetch(url);
  return resp.json();
}

class UploadFromUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpened: false };
  }
  openModal = () => {
    this.setState({ isModalOpened: true });
  };
  closeModal = () => {
    this.setState({ isModalOpened: false });
  };
  handleOnUrl = async url => {
    this.props.onUrl(url);
    this.closeModal();
    this.props.onUploadStart();
    const data = await fetchRemoteJSON(url);
    this.props.onUploadEnd(data);
  };
  render() {
    return (
      <React.Fragment>
        <UrlModal
          open={this.state.isModalOpened}
          handleClose={this.closeModal}
          onUrl={this.handleOnUrl}
        />
        <Tooltip title="Upload stats.json file from the url">
          <Button
            color="primary"
            variant="fab"
            disabled={this.props.disabled}
            component="span"
            onClick={this.openModal}
            className={this.props.classes.button}
          >
            <LinkIcon />
          </Button>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UploadFromUrl);
