import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { isSimpleModule } from "../../lib/modules";
import styles from "./styles";

const POPULAR_LIMIT = 40;

const ModuleCard = withStyles(styles)(
  ({ id, label, path, classes, onClick }) => (
    <Card className={classes.moduleInfo} onClick={() => onClick(id)}>
      <CardContent>
        <CardHeader title={label} subheader={path} />
      </CardContent>
    </Card>
  ),
);

ModuleCard.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

function getSimpleModulesCount(modules) {
  let count = 0;
  for (let i = 0; i < modules.length; i++) {
    if (isSimpleModule(modules[i])) count++;
  }
  return count;
}

const Modules = (props) => {
  const { modules, classes, onModuleClick } = props;
  if (!modules.length) return null;
  const sortedModules = modules
    .sort((m1, m2) => m2.reasons.length - m1.reasons.length)
    .slice(0, POPULAR_LIMIT);
  return (
    <div className={classes.statsRoot}>
      <Typography variant="headline">
        {getSimpleModulesCount(modules)} files loaded
      </Typography>
      <Typography>Most popular {POPULAR_LIMIT}:</Typography>
      <div className={classes.statsList}>
        {sortedModules.map(({ id, label, name }) => (
          <ModuleCard
            key={id}
            id={id}
            label={label}
            path={name}
            onClick={onModuleClick}
          />
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
  onModuleClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Modules);
