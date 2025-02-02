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
import NCrVisualization from './problems/ncr';
import LCSVisualizer from './problems/longestCommonSubsequence';
import InterleaveVisualizer from './problems/interleavingString';
import RemoveDuplicateLettersVisualizer from './problems/uniqueChactersSorted';
import NQueensVisualizer from './backtracking/NQueens';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GCDVisualizer from './problems/gcd';
import PartitionTree from './backtracking/stringPartition';
import MazeSolver from './backtracking/RatMaze';
import WordBreakVisualizer from './backtracking/WordSearch';

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
            <Route path="/nCr" element={<NCrVisualization/>}/>
            <Route path="/LCS" element={<LCSVisualizer/>}/>
            <Route path="/GCD" element={<GCDVisualizer/>} />
            <Route path="/interleaving" element={<InterleaveVisualizer/>}/>
            <Route path="/Unique-characters-sorted" element={<RemoveDuplicateLettersVisualizer/>}/>
            <Route path="/string-partitions" element={<PartitionTree/>} />
            <Route path="/NQueens" element={<NQueensVisualizer/>}/>
            <Route path="/MazeSolver" element={<MazeSolver/>} />
            <Route path="/WordSearch" element={<WordBreakVisualizer/>} />
            <Route path="/" element={<LandingPage/>} />
            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
