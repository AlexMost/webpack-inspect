import React from "react";
import { getModulesMap } from "../webpack-helpers.js";

function createNode(mod, level, color = 'gray') {
    return {
        id: mod.id,
        label: mod.id.toString(),
        title: mod.name,
        color,
        level
    }
}

function createEdge(modFrom, modTo) {
    return {
        from: modFrom.id,
        to: modTo.id,
        arrows: "from",
    }
}

function drawVizGraph({ nodes, edges, clusterMap, onNodeClick }) {
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
                direction: 'DU',
                nodeSpacing: 80
            }
        }
    };
    var network = new vis.Network(container, data, options);

    // clusterization

    // const clusters = {};
    // nodes.forEach(({ id, level }) => {
    //     const cluster = clusterMap[id];
    //     if (cluster) {
    //         if (!clusters[cluster]) {
    //             clusters[cluster] = { ids: new Set(), level };
    //         }
    //         clusters[cluster].ids.add(id);
    //     }
    // })

    // Object.keys(clusters).forEach((clusterName) => {
    //     const cluster = clusters[clusterName];

    //     const clusterOptionsByData = {
    //         joinCondition:function(childOptions) {
    //             return cluster.ids.has(childOptions.id);
    //         },
    //         clusterNodeProperties: {
    //           id: clusterName,
    //           borderWidth:3,
    //           shape:'dot',
    //           size: 30,
    //           label: clusterName.replace('/work/uaprom/cs/domain/', ''),
    //           level: cluster.level,
    //           font: { size: 10, color: 'gray' }
    //         }
    //     }
    //     network.cluster(clusterOptionsByData);
    // })
    network.on("click", function (params) {
        if (params.nodes.length > 0) {
            console.log('node click', params);
            onNodeClick({ node: params.nodes[0] });
        }
    });
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
        const modIds = chunk.modules.map(({ id }) => id);
        moduleIds = moduleIds.concat(modIds);
    });

    return new Set(moduleIds);
}

function renderGraph({ statsData, moduleId, selectedAsset, clusterMap, onNodeClick }) {
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

    function walk(node, level = 0) {
        if (!visited.has(node.id)) {

            visited.add(node.id);
            nodes.push(createNode(node, level, node.id === moduleId ? 'red' : 'gray'));

            node
                .reasons
                .filter((reason) => !! modulesMap[reason.moduleId])
                .forEach((reason) => {
                    const reasonMod = modulesMap[reason.moduleId];
                    edges.push(createEdge(node, reasonMod));
                    if (!visited.has(reason.moduleId)) {
                        walk(reasonMod, level + 1);
                    }
                });
        }
    }
    if (modulesMap[moduleId] !== undefined) {
        walk(modulesMap[moduleId]);
        drawVizGraph({ nodes, edges, clusterMap, onNodeClick });
    } else {
        const node = statsData.modules.find((m) => m.id === moduleId);
        drawVizGraph({ nodes: [createNode(node, 0, 'red')], edges: [], clusterMap, onNodeClick });
        console.warn('TODO: handle when there is no deps for the selected asset');
    }
}

function createMarkup() {
    return {
        __html: '<div id="graph-container" style="height:100vh"></div>'
    }
}

export class VisGraph extends React.Component {
    componentDidMount() {
        renderGraph(this.props);
    }
    componentDidUpdate() {
        renderGraph(this.props);
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.moduleId !== this.props.moduleId;
    }
    render() {
        return <div dangerouslySetInnerHTML={createMarkup()}></div>;
    }
}
