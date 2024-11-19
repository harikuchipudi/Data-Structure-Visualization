import React, { useState } from "react";
import "./PerfectSum.css";

const TargetSumVisualization = () => {
  const [array, setArray] = useState([]);
  const [targetSum, setTargetSum] = useState(0);
  const [steps, setSteps] = useState([]);
  const [dp, setDp] = useState([]);

  const calculatePerfectSum = () => {
    const MOD = 1000000007;
    const n = array.length;
    let dpArray = Array(targetSum + 1).fill(0);
    dpArray[0] = 1; // Base case: One subset (empty subset) sums to 0

    const stepLogs = [];

    for (let i = 0; i < n; i++) {
      const currentStep = [...dpArray];
      for (let j = targetSum; j >= array[i]; j--) {
        dpArray[j] = (dpArray[j] + dpArray[j - array[i]]) % MOD;
      }
      stepLogs.push({ dp: [...dpArray], element: array[i], prevDp: currentStep });
    }

    setDp(dpArray);
    setSteps(stepLogs);
  };

  const handleSubmit = () => {
    if (array.length && targetSum >= 0) calculatePerfectSum();
  };

  return (
    <div className="perfect-sum-container">
      <h1>Perfect Sum Problem Visualization</h1>

      {/* Input Section */}
      <div className="input-section">
        <label>
          Enter Array (comma-separated):{" "}
          <input
            type="text"
            onChange={(e) =>
              setArray(e.target.value.split(",").map(Number))
            }
          />
        </label>
        <label>
          Enter Target Sum:{" "}
          <input
            type="number"
            onChange={(e) => setTargetSum(Number(e.target.value))}
          />
        </label>
        <button onClick={handleSubmit}>Visualize</button>
      </div>

      {/* Visualization Section */}
      <div className="visualization-section">
        {steps.length > 0 && (
          <>
            <h2>DP Array Updates</h2>
            <div className="dp-steps">
              {steps.map((step, index) => (
                <div key={index} className="step">
                  <h3>Step {index + 1}: Processing Element {step.element}</h3>
                  <p>Previous DP Array: {step.prevDp.join(", ")}</p>
                  <p>Updated DP Array: {step.dp.join(", ")}</p>
                  <div className="dp-visual">
                    {step.dp.map((val, idx) => (
                      <div
                        key={idx}
                        className="dp-cell"
                        style={{ backgroundColor: val > 0 ? "#4CAF50" : "#f4f4f4" }}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {dp.length > 0 && (
          <div className="final-output">
            <h2>Final DP Array</h2>
            <div className="dp-visual">
              {dp.map((val, idx) => (
                <div
                  key={idx}
                  className="dp-cell"
                  style={{ backgroundColor: val > 0 ? "#2196F3" : "#f4f4f4" }}
                >
                  {val}
                </div>
              ))}
            </div>
            <h3>Result: {dp[targetSum]}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TargetSumVisualization;
