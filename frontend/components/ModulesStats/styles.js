const styles = (theme) => ({
  statsRoot: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  statsList: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
  },
  moduleInfo: {
    width: theme.spacing.unit * 40,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    cursor: "pointer",
  },
});

export default styles;
