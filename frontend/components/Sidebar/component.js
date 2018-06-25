import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { styles } from "./styles";

const SidebarComponent = withStyles(styles)(props => {
  const module = props.modules.find(m => m.id === props.selectedModuleId);
  const { sidebarRoot, listItemCaption } = props.classes;
  if (!module) return null;
  return (
    <div className={sidebarRoot}>
      <Typography align="center" gutterBottom noWrap variant="title">
        {module.label}
      </Typography>
      <List disablePadding>
        <ListSubheader disableSticky>
          {module.reasons.length} Reasons:
        </ListSubheader>
        {module.reasons.map(reason => {
          const module = props.modules.find(m => m.id === reason.moduleId);
          return (
            <ListItem key={reason.module + reason.loc} divider>
              <ListItemText>
                <Typography noWrap>{module.label}</Typography>
                <Typography className={listItemCaption} variant="caption">
                  {module.name}
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
});

export default SidebarComponent
