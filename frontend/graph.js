import React from "react";
import { StoreContext } from "./store";
import { getModulesMap } from "./webpack-helpers.js";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

function createNode(mod, level, color='gray') {
    return {
        id: mod.id,
        label: mod.id,
        title: mod.name,
        color,
        level,
    }
}

function createEdge(modFrom, modTo) {
    return {
        from: modFrom.id,
        to: modTo.id,
        arrows: "from",
    }
}

function drawVizGraph({ nodes, edges }) {
    var container = document.getElementById('graph-container');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
        nodes: {
            shape: 'circle'
        },
        layout: {
            hierarchical: {
                direction: 'DU'
            }
        }
    };
    var network = new vis.Network(container, data, options);
}

function renderGraph(statsData, moduleId) {
    const modulesMap = getModulesMap(statsData);
    
    const nodes = [];
    const edges = [];
    const visited = new Set();

    function walk(node, level=0) {
        if (! visited.has(node.id)) {

            visited.add(node.id);
            nodes.push(createNode(node, level, node.id === moduleId ? 'red' : 'gray'));

            node
            .reasons
            .filter((r) => !visited.has(r.moduleId))
            .forEach(reason => {
                const reasonMod = modulesMap[reason.moduleId];
                edges.push(createEdge(node, reasonMod));
                walk(reasonMod, level + 1);
            });
        }
    }

    walk(modulesMap[moduleId]);
    drawVizGraph({ nodes, edges });
}

function createMarkup() {
    return {
        __html: '<div id="graph-container" style="height:100vh"></div>'
    }
}

class Graph extends React.Component {
    componentDidMount() {
        renderGraph(this.props.statsData, this.props.moduleId);
    }
    componentDidUpdate(){
        renderGraph(this.props.statsData, this.props.moduleId);
    }
    render() {
        return <div dangerouslySetInnerHTML={createMarkup()}></div>;
    }
}

const styles = theme => ({
    root: theme.mixins.gutters({
      padding: 16,
      marginTop: theme.spacing.unit * 3,
    }),
  });

export const ModuleGraph = withStyles(styles)((props) => {
    return (
        <StoreContext.Consumer>
            {
                (ctx) => {
                    return ctx.moduleId ?
                    <Paper className={props.classes.root} elevation={4}>
                        <Graph statsData={ctx.statsData} moduleId={ctx.moduleId}/>
                    </Paper> : null;
                }
            }
        </StoreContext.Consumer>
    );
});
