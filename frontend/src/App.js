import './App.css';
import ArrayVisualization from './pages/array';
import LinkedListVisualization from './pages/linkedlist';
import StackVisualization from './pages/stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <div style={{ textAlign: 'center' }}>
          <h1 className="header">Data Structures Visualizer</h1>
          <nav className="navigation">
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li>
                <Link to="/array" className="nav-link">Array Visualization</Link>
              </li>
              <li>
                <Link to="/stack" className="nav-link">Stack Visualization</Link>
              </li>
              <li>
                <Link to="/linked-list" className="nav-link">Linked List Visualization</Link>
              </li>
              <li>
                <Link to="/queue" className="nav-link">Queue Visualization</Link>
              </li>
              <li>
                <Link to="/binary-tree" className="nav-link">Binary Tree Visualization</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/array" element={<ArrayVisualization />} />
            <Route path="/stack" element={<StackVisualization />} />
            <Route path="/linked-list" element={<LinkedListVisualization />} />
            <Route path="/" element={<div className="home-container">
              <h2>Welcome to the Data Structures Visualizer!</h2>
              <p>Select a data structure from the menu to visualize and interact with it.</p>
            </div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
