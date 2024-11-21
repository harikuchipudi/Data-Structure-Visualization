import './App.css';
import LandingPage from './components/landingPage';
import Header from './components/header';
import ArrayVisualization from './pages/array';
import LinkedListVisualization from './pages/linkedlist';
import StackVisualization from './pages/stack';
import QueueVisualization from './pages/queue';
import GraphVisualization from './pages/graph';
import KnapSack01 from './problems/knapsack01';
import TrappingWaterVisualization from './problems/rainWater';
import TargetSumVisualization from './problems/targetSumWays';
import MaxProductSubarray from './problems/maximumProductSubArray';
import LongestSubsequence from './problems/LongestIncreasingSubsequence';
import DataStructures from './components/dataStructures';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
     
      <Router>
        <Header/>
        <div className="main-content">
          <Routes>
            <Route path="/Data Structures" element={<DataStructures/>} />
            <Route path="/array" element={<ArrayVisualization />} />
            <Route path="/stack" element={<StackVisualization />} />
            <Route path="/linked-list" element={<LinkedListVisualization />} />
            <Route path="/queue" element={<QueueVisualization/>}/>
            <Route path="/graph" element={<GraphVisualization/>}/>
            <Route path="/knapsack" element={<KnapSack01/>}/>
            <Route path="/Rain-water" element={<TrappingWaterVisualization/>}/>
            <Route path="/Target-sum" element={<TargetSumVisualization/>}/>
            <Route path="max-product" element={<MaxProductSubarray/>}/>
            <Route path="/lis" element={<LongestSubsequence/>}/>
            <Route path="/" element={<LandingPage/>} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
