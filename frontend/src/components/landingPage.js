import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Header from './header';

function LandingPage() {
  const dataStructures = [
    { name: "Array Visualization", path: "/array" },
    { name: "Stack Visualization", path: "/stack" },
    { name: "Linked List Visualization", path: "/linked-list" },
    { name: "Queue Visualization", path: "/queue" },
    { name: "Graph Visualization", path: "/graph" },
    { name: "Knapsack Visualization", path: "/knapsack" },
    { name: "Trapping Rain Water", path: "/Rain-water" },
    { name: "Target Sum Visualization", path: "/Target-sum" },
  ];

  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Data Structures Visualizer</h1>
      <p className="landing-subtitle">Explore and interact with various data structures and algorithms.</p>
      <div className="grid-container">
        {dataStructures.map((ds, index) => (
          <Link to={ds.path} key={index} className="grid-item">
            {ds.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
