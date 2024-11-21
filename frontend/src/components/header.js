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
          <li><Link to="/Data Structures" className="nav-link"> Data Structures</Link></li>
          <li><Link to="/Algorithms" className="nav-link">Algorithms</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
