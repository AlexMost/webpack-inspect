import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import styles from "./styles";

function getReasons(module) {
  return module.reasons.filter(({ moduleId }) => Boolean(moduleId));
}

const SidebarComponent = (props) => {
  const { modules, selectedModuleId, classes } = props;
  const { sidebarRoot, listItemCaption, reasonLabel } = classes;

  const module = modules.find((m) => m.id === selectedModuleId);
  if (!module) return null;
  const reasons = getReasons(module);
  return (
    <div className={sidebarRoot}>
      <Typography align="center" gutterBottom noWrap variant="title">
        {module.label}
      </Typography>
      <List disablePadding>
        <ListSubheader disableSticky>
          {`${reasons.length} `}
          Reasons:
        </ListSubheader>
        {reasons.map((reason) => {
          const mod = modules.find((m) => m.id === reason.moduleId);
          const { label, name } = mod;
          return (
            <ListItem key={reason.module + reason.loc} divider>
              <ListItemText>
                <Typography className={reasonLabel} noWrap>
                  {label}
                </Typography>
                <Typography className={listItemCaption} variant="caption">
                  {name}
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

SidebarComponent.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedModuleId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarComponent);
