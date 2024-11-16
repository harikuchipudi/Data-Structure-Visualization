import React, { useState } from "react";
import "./graphStyles.css";

function GraphVisualization() {
  const [nodes, setNodes] = useState([
    { id: 1, x: 100, y: 100, label: "Node 1" },
    { id: 2, x: 300, y: 200, label: "Node 2" },
    { id: 3, x: 500, y: 100, label: "Node 3" },
    { id: 4, x: 400, y: 300, label: "Node 4" },
  ]);

  const [edges, setEdges] = useState([
    { source: 1, target: 2, weight: 1 },
    { source: 1, target: 3, weight: 4 },
    { source: 2, target: 3, weight: 2 },
    { source: 3, target: 4, weight: 3 },
  ]);

  const [shortestPaths, setShortestPaths] = useState({});
  const [sourceNode, setSourceNode] = useState("");

  const addNode = () => {
    const newNodeId = nodes.length + 1;
    const newNode = {
      id: newNodeId,
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50,
      label: `Node ${newNodeId}`,
    };
    setNodes([...nodes, newNode]);
  };

  const addEdge = () => {
    const source = nodes[Math.floor(Math.random() * nodes.length)].id;
    const target = nodes[Math.floor(Math.random() * nodes.length)].id;
    const weight = Math.floor(Math.random() * 10) + 1;

    if (
      source !== target &&
      !edges.find((edge) => edge.source === source && edge.target === target)
    ) {
      setEdges([...edges, { source, target, weight }]);
    }
  };

  const dijkstra = (startNode) => {
    const distances = {};
    const previousNodes = {};
    const visited = new Set();

    // Initialize distances and previous nodes
    nodes.forEach((node) => {
      distances[node.id] = Infinity;
      previousNodes[node.id] = null;
    });
    distances[startNode] = 0;

    const getNextNode = () => {
      let closestNode = null;
      let smallestDistance = Infinity;
      for (const nodeId in distances) {
        if (
          !visited.has(parseInt(nodeId)) &&
          distances[nodeId] < smallestDistance
        ) {
          closestNode = parseInt(nodeId);
          smallestDistance = distances[nodeId];
        }
      }
      return closestNode;
    };

    let currentNode = getNextNode();

    while (currentNode !== null) {
      visited.add(currentNode);

      const neighbors = edges.filter(
        (edge) =>
          edge.source === currentNode || edge.target === currentNode
      );

      neighbors.forEach((edge) => {
        const neighborNode =
          edge.source === currentNode ? edge.target : edge.source;
        if (!visited.has(neighborNode)) {
          const newDistance = distances[currentNode] + edge.weight;
          if (newDistance < distances[neighborNode]) {
            distances[neighborNode] = newDistance;
            previousNodes[neighborNode] = currentNode;
          }
        }
      });

      currentNode = getNextNode();
    }

    const paths = {};
    nodes.forEach((node) => {
      if (distances[node.id] !== Infinity) {
        const path = [];
        let current = node.id;
        while (current !== null) {
          path.unshift(current);
          current = previousNodes[current];
        }
        paths[node.id] = { distance: distances[node.id], path };
      } else {
        paths[node.id] = { distance: Infinity, path: [] };
      }
    });

    setShortestPaths(paths);
  };

  const handleDijkstra = () => {
    if (sourceNode && nodes.find((node) => node.id === parseInt(sourceNode))) {
      dijkstra(parseInt(sourceNode));
    } else {
      alert("Please enter a valid source node.");
    }
  };

  return (
    <div className="graph-container">
      <h2>Graph Visualization</h2>
      <button className="add-node-btn" onClick={addNode}>
        Add Node
      </button>
      <button className="add-edge-btn" onClick={addEdge}>
        Add Edge
      </button>

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
        <button className="run-dijkstra-btn" onClick={handleDijkstra}>
          Run Dijkstra
        </button>
      </div>

      <svg className="graph-svg" viewBox="0 0 600 400">
        {/* Draw edges */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find((node) => node.id === edge.source);
          const toNode = nodes.find((node) => node.id === edge.target);

          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill="#4CAF50"
              stroke="black"
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {Object.keys(shortestPaths).length > 0 && (
        <div className="shortest-paths">
          <h3>Shortest Paths from Node {sourceNode}</h3>
          <ul>
            {Object.entries(shortestPaths).map(([node, data]) => (
              <li key={node}>
                Node {node}: Distance ={" "}
                {data.distance === Infinity ? "∞" : data.distance}, Path ={" "}
                {data.path.join(" → ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GraphVisualization;
