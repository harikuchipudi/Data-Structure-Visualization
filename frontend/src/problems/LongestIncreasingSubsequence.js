import React, { useState } from "react";
import "./LongestSubsequence.css";

const LongestSubsequence = () => {
  const [steps, setSteps] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const calculateLIS = (arr) => {
    const n = arr.length;
    const dp = Array(n).fill(1); // Initialize dp array with 1
    const iterations = [];

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
      // Capture the state of the dp array after processing index i
      iterations.push({
        index: i,
        dp: [...dp], // Store a copy of the dp array
        currentElement: arr[i],
      });
    }

    // Store the result
    const maxLIS = Math.max(...dp);
    setFinalResult(maxLIS);
    setSteps(iterations);
  };

  const inputArray = [10, 22, 9, 33, 21, 50, 41, 60]; // Example input

  return (
    <div className="lis-container">
      <h1>Longest Increasing Subsequence (LIS) Visualization</h1>
      <button className="visualize-btn" onClick={() => calculateLIS(inputArray)}>
        Visualize
      </button>
      <h2>Input Array: {JSON.stringify(inputArray)}</h2>
      {steps.length > 0 && (
        <div className="steps-container">
          <table className="steps-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Current Element</th>
                <th>DP Array</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, idx) => (
                <tr key={idx}>
                  <td>{step.index}</td>
                  <td>{step.currentElement}</td>
                  <td>{JSON.stringify(step.dp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {finalResult !== null && (
        <h2 className="result">Longest Increasing Subsequence Length: {finalResult}</h2>
      )}
    </div>
  );
};

export default LongestSubsequence;
