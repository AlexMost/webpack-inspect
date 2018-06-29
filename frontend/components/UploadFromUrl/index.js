import React from "react";
import { withRouter } from "react-router-dom";

import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { loadFromUrl } from "./loader";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import UrlModal from "./UrlModal";
import LoaderComponent from "./LoaderComponent";
import { addQuery } from "../../lib/router-utils";

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
    this.closeModal();
    const historyObj = {
      pathname: this.props.match.path,
      search: addQuery(this.props.location.search, "stats", url)
    };
    this.props.history.push(historyObj);
  };
  render() {
    return (
      <React.Fragment>
        <LoaderComponent
          onUploadStart={this.props.onUploadStart}
          onUploadEnd={this.props.onUploadEnd}
        />
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

export default withRouter(withStyles(styles)(UploadFromUrl));
