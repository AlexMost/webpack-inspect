import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { StoreContext } from "../store";
import { VisGraph } from "./VisGraph";

const styles = theme => ({
    root: theme.mixins.gutters({
      padding: 16,
      marginTop: theme.spacing.unit * 3,
    }),
  });

export const ModulesGraph = withStyles(styles)((props) => {
    return (
        <StoreContext.Consumer>
            {
                (ctx) => {
                    return ctx.moduleId ?
                    <Paper elevation={4}>
                        <VisGraph
                            statsData={ctx.statsData}
                            moduleId={ctx.moduleId}
                            selectedAsset={ctx.selectedAsset}
                        />
                    </Paper> : null;
                }
            }
        </StoreContext.Consumer>
    );
});
