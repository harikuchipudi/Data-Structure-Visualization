import React, { useState } from "react";
import "./GCDVisualizer.css";


function GCDVisualizer() {
  const [nums, setNums] = useState("");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);

  // Utility to calculate GCD using Euclidean Algorithm
  const gcdUtil = (a, b) => {
    const steps = [];
    while (b !== 0) {
      steps.push({ a, b, remainder: a % b });
      const temp = b;
      b = a % b;
      a = temp;
    }
    steps.push({ a, b, remainder: 0 }); // Final step when b becomes 0
    return { gcd: a, steps };
  };

  const calculateGCD = () => {
    const numbers = nums.split(",").map(Number);
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const { gcd, steps } = gcdUtil(max, min);

    setSteps(steps);
    setResult(gcd);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>GCD Visualizer</h2>
      <p>Enter numbers separated by commas:</p>
      <input
        type="text"
        value={nums}
        onChange={(e) => setNums(e.target.value)}
        placeholder="e.g., 12,15,21"
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={calculateGCD}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Calculate GCD
      </button>
      {result !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Steps:</h3>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>a</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>b</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  a % b (Remainder)
                </th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {step.a}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {step.b}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {step.remainder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>GCD: {result}</h3>
        </div>
      )}
    </div>
  );
}

export default GCDVisualizer;
