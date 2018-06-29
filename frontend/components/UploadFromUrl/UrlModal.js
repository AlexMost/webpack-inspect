import React from "react";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styles } from "./styles";

class UrlModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }
  handleUrlChange = ev => {
    this.setState({ url: ev.target.value });
  };
  handleKeyPress = ev => {
    if (ev.key === "Enter") {
      this.props.onUrl(this.state.url);
    }
  };
  handleButtonPress = () => {
    this.props.onUrl(this.state.url);
  };
  render() {
    const { classes, handleClose, open } = this.props;
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
            value={this.state.url}
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

export default withStyles(styles)(UrlModal);
