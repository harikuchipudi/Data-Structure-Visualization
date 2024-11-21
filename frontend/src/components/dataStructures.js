import React from "react";
import { Link } from "react-router-dom";
import "./datastructures.css";

function DataStructures(){

    const dataStructures = [
        { name: "Array Visualization", path: "/array" },
        { name: "Stack Visualization", path: "/stack" },
        { name: "Linked List Visualization", path: "/linked-list" },
        { name: "Queue Visualization", path: "/queue" },
        { name: "Graph Visualization", path: "/graph" },
        { name: "Knapsack Visualization", path: "/knapsack" },
        { name: "Trapping Rain Water", path: "/Rain-water" },
        { name: "Target Sum Visualization", path: "/Target-sum" },
        { name: "Longest Increasing Subsequence", path: "/lis"},
        { name: "nCr Problem", path: "/nCr"},
      ];

    return(
        <div className="ds-page">
        <h2 className="ds-title">Welcome to Data Structures Visualizer</h2>
        <div className="grid-container">
            {dataStructures.map((ds, index) => (
            <Link to={ds.path} key={index} className="grid-item">
                {ds.name}
            </Link>
            ))}
        </div>
        </div>
    )
}

export default DataStructures;