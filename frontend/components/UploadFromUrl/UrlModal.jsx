import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./styles";

class UrlModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }

  handleUrlChange = ev => {
    this.setState({ url: ev.target.value });
  };

  handleKeyPress = ev => {
    const { onUrl } = this.props;
    const { url } = this.state;
    if (ev.key === "Enter") {
      onUrl(url);
    }
  };

  handleButtonPress = () => {
    const { onUrl } = this.props;
    const { url } = this.state;
    onUrl(url);
  };

  render() {
    const { classes, handleClose, open } = this.props;
    const { url } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.modal}>
          <TextField
            className={classes.modalInput}
            inputRef={input => input && input.focus()}
            placeholder="URL for stats.json"
            value={url}
            onChange={this.handleUrlChange}
            onKeyPress={this.handleKeyPress}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleButtonPress}
          >
            Ok
          </Button>
        </div>
      </Modal>
    );
  }
}

UrlModal.defaultProps = {
  onUrl: () => {},
  handleClose: () => {},
};

UrlModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onUrl: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(UrlModal);
