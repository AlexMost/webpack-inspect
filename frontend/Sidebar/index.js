import React from "react";
import { StoreContext } from "../store";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    paper: {
        height: '100vh',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const SidebarComponent = withStyles(styles)((props) => {
    const { classes } = props;
    const module = props.modules.find((m) => m.id === props.selectedModuleId);
    return (
        <Paper className={classes.paper}>
            <Typography align="left" variant="title">{module.name}</Typography>
            <Typography align="left" variant="subheading">
                {module.reasons.length} Reasons:
            </Typography>
            <ul>
                { module.reasons.map((reason) => {
                    return <li key={reason.module}><Typography align="left">{reason.module}</Typography></li>
                })}
            </ul>
        </Paper>
    )
})

const Sidebar = () => {
    return (
        <StoreContext.Consumer>
            {
                ctx => (
                    ctx.selectedModuleId ? <SidebarComponent
                        modules={ctx.statsData.modules || []}
                        selectedModuleId={ctx.selectedModuleId}
                    /> : null
                )
            }
        </StoreContext.Consumer>
    )
}

export default Sidebar;
