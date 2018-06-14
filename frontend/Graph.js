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

function getAssetChunks(statsData, assetName) {
    if (!assetName) return [];
    const asset = statsData.assets.find((a) => a.name === assetName)
    return asset ? asset.chunks : [];
}

function getChunksModulesSet(statsData, asset) {
    const chunks = getAssetChunks(statsData, asset)
        .map((chId) => statsData.chunks.find((c) => c.id === chId));
    
    let moduleIds = [];
    chunks.forEach((chunk) => {
        const modIds = chunk.modules.map(({id}) => id);
        moduleIds = moduleIds.concat(modIds);
    });

    return new Set(moduleIds);
}

function renderGraph(statsData, moduleId, selectedAsset) {
    let modules = [...statsData.modules]; // copy for modifying

    if (selectedAsset) {
        const moduleIdsSet = getChunksModulesSet(statsData, selectedAsset);
        console.log(moduleIdsSet);
        modules = modules.filter(({ id }) => moduleIdsSet.has(id));
    }

    const modulesMap = getModulesMap(modules);
    const nodes = [];
    const edges = [];
    const visited = new Set();

    console.log(`Rendering graph for ${moduleId}. Asset - ${selectedAsset}`);

    function walk(node, level=0) {
        if (! visited.has(node.id)) {

            visited.add(node.id);
            nodes.push(createNode(node, level, node.id === moduleId ? 'red' : 'gray'));

            node
            .reasons
            .filter((r) => !visited.has(r.moduleId))
            .forEach(reason => {
                const reasonMod = modulesMap[reason.moduleId];
                if (reasonMod) {
                    edges.push(createEdge(node, reasonMod));
                    walk(reasonMod, level + 1);
                }
            });
        }
    }
    if (modulesMap[moduleId] !== undefined) {
        walk(modulesMap[moduleId]);
        drawVizGraph({ nodes, edges });
    } else {
        const node = statsData.modules.find((m) => m.id === moduleId);
        drawVizGraph({ nodes: [createNode(node, 0, 'red')], edges: [] });
        console.warn('TODO: handle when there is no deps for the selected asset');
    }
}

function createMarkup() {
    return {
        __html: '<div id="graph-container" style="height:100vh"></div>'
    }
}

class Graph extends React.Component {
    componentDidMount() {
        renderGraph(
            this.props.statsData,
            this.props.moduleId,
            this.props.selectedAsset
        );
    }
    componentDidUpdate(){
        renderGraph(
            this.props.statsData,
            this.props.moduleId,
            this.props.selectedAsset
        );
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
                        <Graph
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
