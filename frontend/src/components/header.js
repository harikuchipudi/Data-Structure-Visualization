import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header-main">
      <h1 className="header-title">Data Structures Visualizer</h1>
      <nav className="navigation">
        <ul>
          <li><Link to="/array" className="nav-link">Array Visualization</Link></li>
          <li><Link to="/stack" className="nav-link">Stack Visualization</Link></li>
          <li><Link to="/linked-list" className="nav-link">Linked List Visualization</Link></li>
          <li><Link to="/queue" className="nav-link">Queue Visualization</Link></li>
          <li><Link to="/graph" className="nav-link">Graph Visualization</Link></li>
          <li><Link to="/knapsack" className="nav-link">Knapsack Visualization</Link></li>
          <li><Link to="/Rain-water" className="nav-link">Trapping Rain Water</Link></li>
          <li><Link to="/Target-sum" className="nav-link">Target Sum Visualization</Link></li>
          <li><Link to="/max-product" className='nav-link'>Max Product subarray</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
