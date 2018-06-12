import { getDepIds, getModulesMap } from "./webpack-helpers.js";
import { drawGraph } from "./view.js";

// const nodes = [
//     { id: "1", label: "node1" },
//     { id: "2", label: "node2" },
//     { id: "3", label: "node3" },
// ]

const edges = [
    // { target: "2", source: "1", strength: 0.1 }
]

const STATS_URL = '/stats';

async function loadStatsData() {
    const resp = await fetch(STATS_URL);
    return resp.json();
}


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

async function start() {
    const { stats: statsData, moduleId } = await loadStatsData();
    // const depIds = getDepIds(statsData, moduleId);
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
    drawGraph({ nodes, edges });
}

start();
