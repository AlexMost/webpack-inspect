import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import styles from "./styles";

const SidebarComponent = withStyles(styles)(props => {
  const { modules, selectedModuleId, classes } = props;
  const { sidebarRoot, listItemCaption, reasonLabel } = classes;

  const module = modules.find(m => m.id === selectedModuleId);
  if (!module) return null;
  return (
    <div className={sidebarRoot}>
      <Typography align="center" gutterBottom noWrap variant="title">
        {module.label}
      </Typography>
      <List disablePadding>
        <ListSubheader disableSticky>
          {module.reasons.length}
          Reasons:
        </ListSubheader>
        {module.reasons.map(reason => {
          const { label, name } = modules.find(m => m.id === reason.moduleId);
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
});

export default SidebarComponent;
