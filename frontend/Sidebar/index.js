import React from "react";
import { StoreContext } from "../store";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    return <Paper className={classes.paper} >{ props.selectedModuleId }</Paper>
})

const Sidebar = () => {
    return (
        <StoreContext.Consumer>
            {
                ctx => (
                    <SidebarComponent
                        selectedModuleId={ctx.selectedModuleId}
                    />
                )
            }
        </StoreContext.Consumer>
    )
}

export default Sidebar;
