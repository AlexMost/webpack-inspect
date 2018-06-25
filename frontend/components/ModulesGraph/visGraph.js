import { getModulesMap } from "../../lib/webpack-helpers";

function createNode(mod, level) {
  return {
    id: mod.id,
    label: mod.id.toString(),
    title: mod.name,
    color: "gray",
    level,
    shape: "circle"
  };
}

function createMainNode(mod, level) {
  return {
    id: mod.id,
    label: mod.label,
    title: mod.name,
    color: "red",
    level,
    shape: "dot"
  };
}

function createEdge(modFrom, modTo) {
  return {
    from: modFrom.id,
    to: modTo.id,
    arrows: "to"
  };
}

// TODO: rewrite clusterization logic (get cluster id from module)

// function makeClusters(network, nodes, clusterMap) {
//     const clusters = {};
//     nodes.forEach(({ id, level }) => {
//         const cluster = clusterMap[id];
//         if (cluster) {
//             const clusterName = cluster.getId();
//             if (!clusters[clusterName]) {
//                 clusters[clusterName] = { ids: new Set(), level };
//             }
//             clusters[clusterName].ids.add(id);
//         }
//     })

//     Object.keys(clusters).forEach((clusterName) => {
//         const cluster = clusters[clusterName];

//         const clusterOptionsByData = {
//             joinCondition:function(childOptions) {
//                 return cluster.ids.has(childOptions.id);
//             },
//             clusterNodeProperties: {
//               id: clusterName,
//               borderWidth:3,
//               shape:'dot',
//               size: 30,
//               label: clusterName.replace('/work/uaprom/cs/domain/', ''),
//               level: cluster.level,
//               font: { size: 10, color: 'gray' }
//             }
//         }
//         network.cluster(clusterOptionsByData);
//     })
// }

function drawVizGraph({ nodes, edges, onNodeClick, onDrawEnd }, opts) {
  console.log(
    `Rendering graph: nodes - ${nodes.length}; edges - ${edges.length}`
  );
  var container = document.getElementById("graph-container");
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      shape: "circle"
    },
    width: `${opts.width}px`,
    height: `${opts.height}px`,
    layout: {
      hierarchical: {
        direction: "DU",
        nodeSpacing: 80
      }
    }
  };
  var network = new vis.Network(container, data, options);

  // clusterization
  // makeClusters(network, nodes, clusterMap);

  network.on("click", function(params) {
    if (params.nodes.length > 0) {
      onNodeClick({ node: params.nodes[0] });
    }
  });
  network.on("afterDrawing", function(args) {
    onDrawEnd();
  });
}

export function renderGraph(
  { modules, moduleId, onNodeClick, onDrawEnd, onDrawStart },
  opts
) {
  onDrawStart();
  const modulesMap = getModulesMap(modules);
  const nodes = [];
  const edges = [];
  const visited = new Set();

  function walk(node, level = 0) {
    // TODO: think about level restriction
    // if (level > 2) return;
    if (!visited.has(node.id)) {
      visited.add(node.id);

      nodes.push(
        node.id === moduleId
          ? createMainNode(node, level)
          : createNode(node, level)
      );

      node.reasons
        .filter(reason => !!modulesMap[reason.moduleId])
        .forEach(reason => {
          const reasonMod = modulesMap[reason.moduleId];
          edges.push(createEdge(node, reasonMod));
          if (!visited.has(reason.moduleId)) {
            walk(reasonMod, level + 1);
          }
        });
    }
  }

  walk(modulesMap[moduleId]);
  drawVizGraph({ nodes, edges, onNodeClick, onDrawEnd }, opts);
}
