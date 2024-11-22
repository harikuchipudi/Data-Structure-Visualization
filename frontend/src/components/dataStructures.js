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
        { name: "Longest common Subsequence", path: "/LCS"},
      ];

    return(
        <div className="ds-page">
        <h2 className="ds-title">Welcome to Data Structures Visualizer</h2>
        <div class="row">
            <div class="col-sm-4">
            <div class="card">
            <Link to="/array" className="card-body">
                <h4><b>Array Visualization</b></h4>
            </Link>
            </div>
            </div>
            <div class="col-sm-4">
            <div class="card">
            <Link to="/array" className="card-body">
                <h4><b>Array Visualization</b></h4>
            </Link>
            </div>
            </div>
            <div class="col-sm-4">
            <div class="card">
            <Link to="/array" className="card-body">
                <h4><b>Array Visualization</b></h4>
            </Link>
            </div>
            </div>
        </div>
        </div>
    )
}

export default DataStructures;