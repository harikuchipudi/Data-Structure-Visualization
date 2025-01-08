import React, { useState } from "react";

// Step 1: Generate Tree Data
const generateTree = (s, index, current) => {
  const node = {
    current: [...current], // Copy of the current partition
    remaining: s.slice(index), // Remaining string
    index, // Current index in the recursive call
    isBaseCase: index === s.length, // Mark base case
    children: [], // To hold recursive calls
  };

  if (node.isBaseCase) {
    return node; // Base case: Return the node
  }

  for (let i = index; i < s.length; i++) {
    current.push(s.substring(index, i + 1)); // Add substring
    const childNode = generateTree(s, i + 1, current); // Recursive call
    node.children.push(childNode); // Add child to the current node
    current.pop(); // Backtrack
  }

  return node;
};

// Step 2: TreeNode Component for Recursive Rendering
const TreeNode = ({ node }) => {
  return (
    <div
      style={{
        marginLeft: "20px",
        borderLeft: "1px solid #ccc",
        padding: "10px",
        backgroundColor: node.isBaseCase ? "#F5F5DC" : "white", // Highlight base case
        border: node.isBaseCase ? "2px solid #FF4500" : "1px solid #ccc", // Different border for base case
        borderRadius: "5px",
        color: "black",
      }}
    >
      <div>
        <strong>Index:</strong> {node.index} | 
        <strong> Partition:</strong> [{node.current.join(", ")}] | 
        <strong> Remaining:</strong> "{node.remaining}"
      </div>
      {node.children.map((child, index) => (
        <TreeNode key={index} node={child} />
      ))}
    </div>
  );
};

// Step 3: Main Component
const PartitionTree = () => {
  const [tree, setTree] = useState(null);
  const [input, setInput] = useState("");

  const startVisualization = () => {
    if (input.trim() === "") {
      alert("Please enter a valid string.");
      return;
    }
    const generatedTree = generateTree(input, 0, []);
    setTree(generatedTree);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Partition Tree Visualization</h1>
      <input
        type="text"
        placeholder="Enter a string"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "10px",
        }}
      />
      <br />
      <button
        onClick={startVisualization}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Generate Tree
      </button>
      <div style={{ marginTop: "20px" }}>
        {tree ? <TreeNode node={tree} /> : <p>Enter a string to generate the tree.</p>}
      </div>
    </div>
  );
};

export default PartitionTree;
