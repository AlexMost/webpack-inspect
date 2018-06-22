const drawerWidth = "30vw";

export const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        overflow: "hidden",
        height: "100vh"
    },
    drawerHeader: {
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }
});
