import './App.css';
import ArrayVisualization from './pages/array';
import LinkedListVisualization from './pages/linkedlist';
import StackVisualization from './pages/stack';
import QueueVisualization from './pages/queue';
import GraphVisualization from './pages/graph';
import KnapSack01 from './problems/knapsack01';
import TrappingWaterVisualization from './problems/rainWater';
import TargetSumVisualization from './problems/targetSumWays';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <div className='header-main' style={{ textAlign: 'center' }}>
          <h1 className='header'>Data Structures Visualizer</h1>
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
                <Link to="/graph" className="nav-link">Graph Visualization</Link>
              </li>
              <li>
                <Link to="/knapsack" className='nav-link'>Knapsack Visualization</Link>
              </li>
              <li>
                <Link to="/Rain-water" className='nav-link'>Trapping Rain Water</Link>
              </li>
              <li>
                <Link to="/Target-sum" className='nav-link'>Target Sum Visualization</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/array" element={<ArrayVisualization />} />
            <Route path="/stack" element={<StackVisualization />} />
            <Route path="/linked-list" element={<LinkedListVisualization />} />
            <Route path="/queue" element={<QueueVisualization/>}/>
            <Route path="/graph" element={<GraphVisualization/>}/>
            <Route path="/knapsack" element={<KnapSack01/>}/>
            <Route path="/Rain-water" element={<TrappingWaterVisualization/>}/>
            <Route path="/Target-sum" element={<TargetSumVisualization/>}/>

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
