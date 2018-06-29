import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./styles";
import UrlModal from "./UrlModal";

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
    const { onUrl } = this.props;
    this.closeModal();
    onUrl(url);
  };

  render() {
    const { disabled, classes } = this.props;
    const { isModalOpened } = this.state;
    return (
      <React.Fragment>
        <UrlModal
          open={isModalOpened}
          handleClose={this.closeModal}
          onUrl={this.handleOnUrl}
        />
        <Tooltip title="Upload stats.json file from the url">
          <Button
            color="primary"
            variant="fab"
            disabled={disabled}
            component="span"
            onClick={this.openModal}
            className={classes.button}
          >
            <LinkIcon />
          </Button>
        </Tooltip>
      </React.Fragment>
    );
  }
}

UploadFromUrl.propTypes = {
  disabled: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(UploadFromUrl));
