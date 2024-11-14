import React, { useState } from 'react';
import './graphStyles.css';

function GraphVisualization() {
  const [nodes, setNodes] = useState([1, 2, 3]);
  const [edges, setEdges] = useState([[1, 2], [2, 3]]);

  const addNode = () => {
    setNodes([...nodes, nodes.length + 1]);
  };

  const addEdge = () => {
    const source = nodes[Math.floor(Math.random() * nodes.length)];
    const target = nodes[Math.floor(Math.random() * nodes.length)];
    if (source !== target && !edges.find(edge => edge[0] === source && edge[1] === target)) {
      setEdges([...edges, [source, target]]);
    }
  };

  return (
    <div className="graph-container">
      <h2>Graph Visualization</h2>
      <button className="add-node-btn" onClick={addNode}>Add Node</button>
      <button className="add-edge-btn" onClick={addEdge}>Add Edge</button>
      <div className="graph">
        {nodes.map((node) => (
          <div key={node} className="graph-node">
            Node {node}
          </div>
        ))}
        {edges.map((edge, index) => (
          <div key={index} className="graph-edge">
            {edge[0]} → {edge[1]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GraphVisualization;
