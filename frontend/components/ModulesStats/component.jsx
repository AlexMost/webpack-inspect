import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles";

const ModuleCard = withStyles(styles)(({ label, classes }) => (
  <Card className={classes.moduleInfo}>
    <CardContent>
      <Typography>{label}</Typography>
    </CardContent>
  </Card>
));

ModuleCard.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const Modules = (props) => {
  const { modules, classes } = props;
  const sortedModules = modules
    .sort((m1, m2) => m2.reasons.length - m1.reasons.length)
    .slice(0, 30);
  return (
    <div className={classes.statsRoot}>
      <Typography variant="headline">
        {modules.length} modules loaded
      </Typography>
      <Typography>Most popular:</Typography>
      <div className={classes.statsList}>
        {sortedModules.map(({ id, label }) => (
          <ModuleCard key={id} label={label} />
        ))}
      </div>
    </div>
  );
};

Modules.defaultProps = {
  modules: [],
};

Modules.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Modules);
