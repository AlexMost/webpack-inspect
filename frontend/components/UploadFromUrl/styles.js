const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  modal: {
    position: "absolute",
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalInput: {
    width: "100%",
    marginRight: theme.spacing.unit * 4,
  },
});

export default styles;
