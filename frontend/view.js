

export function drawGraph({ nodes, edges }) {
    var container = document.getElementById('container');
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
