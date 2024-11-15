import React, { useState } from 'react';
import './graphStyles.css';

function GraphVisualization() {
  const [nodes, setNodes] = useState([1, 2, 3, 4]);
  const [edges, setEdges] = useState([
    { source: 1, target: 2, weight: 1 },
    { source: 1, target: 3, weight: 4 },
    { source: 2, target: 3, weight: 2 },
    { source: 3, target: 4, weight: 3 }
  ]);
  const [shortestPaths, setShortestPaths] = useState({});
  const [sourceNode, setSourceNode] = useState('');

  const addNode = () => {
    setNodes([...nodes, nodes.length + 1]);
  };

  const addEdge = () => {
    const source = nodes[Math.floor(Math.random() * nodes.length)];
    const target = nodes[Math.floor(Math.random() * nodes.length)];
    const weight = Math.floor(Math.random() * 10) + 1;
    if (source !== target && !edges.find(edge => edge.source === source && edge.target === target)) {
      setEdges([...edges, { source, target, weight }]);
    }
  };

  const dijkstra = (startNode) => {
    const distances = {};
    const visited = new Set();

    // Initialize distances
    nodes.forEach(node => {
      distances[node] = Infinity;
    });
    distances[startNode] = 0;

    const getNextNode = () => {
      let closestNode = null;
      let smallestDistance = Infinity;
      for (const node in distances) {
        if (!visited.has(parseInt(node)) && distances[node] < smallestDistance) {
          closestNode = parseInt(node);
          smallestDistance = distances[node];
        }
      }
      return closestNode;
    };

    let currentNode = getNextNode();

    while (currentNode !== null) {
      visited.add(currentNode);

      const neighbors = edges.filter(edge => edge.source === currentNode || edge.target === currentNode);

      neighbors.forEach(edge => {
        const neighborNode = edge.source === currentNode ? edge.target : edge.source;
        if (!visited.has(neighborNode)) {
          const newDistance = distances[currentNode] + edge.weight;
          if (newDistance < distances[neighborNode]) {
            distances[neighborNode] = newDistance;
          }
        }
      });

      currentNode = getNextNode();
    }

    setShortestPaths(distances);
  };

  const handleDijkstra = () => {
    if (sourceNode && nodes.includes(parseInt(sourceNode))) {
      dijkstra(parseInt(sourceNode));
    } else {
      alert('Please enter a valid source node.');
    }
  };

  return (
    <div className="graph-container">
      <h2>Graph Visualization</h2>
      <button className="add-node-btn" onClick={addNode}>Add Node</button>
      <button className="add-edge-btn" onClick={addEdge}>Add Edge</button>

      <div className="dijkstra-input">
        <label>
          Source Node: 
          <input
            type="number"
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
            placeholder="Enter source node"
          />
        </label>
        <button className="run-dijkstra-btn" onClick={handleDijkstra}>Run Dijkstra</button>
      </div>

      <div className="graph">
        <h3>Nodes</h3>
        <div className="graph-nodes">
          {nodes.map(node => (
            <div key={node} className="graph-node">
              Node {node}
            </div>
          ))}
        </div>

        <h3>Edges</h3>
        <div className="graph-edges">
          {edges.map((edge, index) => (
            <div key={index} className="graph-edge">
              {edge.source} → {edge.target} (Weight: {edge.weight})
            </div>
          ))}
        </div>
      </div>

      {Object.keys(shortestPaths).length > 0 && (
        <div className="shortest-paths">
          <h3>Shortest Paths from Node {sourceNode}</h3>
          <ul>
            {Object.entries(shortestPaths).map(([node, distance]) => (
              <li key={node}>
                Node {node}: {distance === Infinity ? '∞' : distance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GraphVisualization;
