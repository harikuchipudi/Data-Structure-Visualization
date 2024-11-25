import React, { useState } from "react";
import "./interleavingString.css";

const InterleaveVisualizer = () => {
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [dp, setDp] = useState([]);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  const isInterleave = (s1, s2, s3) => {
    const m = s1.length;
    const n = s2.length;

    if (m + n !== s3.length) {
      setResult(false);
      return;
    }

    const dp = Array(m + 1)
      .fill(false)
      .map(() => Array(n + 1).fill(false));
    dp[0][0] = true;

    const logs = [];
    logs.push(`Initial state: dp[0][0] = true`);

    // Fill the first column of the DP table
    for (let i = 1; i <= m; i++) {
      dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
      logs.push(
        `Checking s1[0..${i - 1}] (${s1.slice(0, i)}) with s3[0..${i - 1}] (${s3.slice(
          0,
          i
        )}): dp[${i}][0] = ${dp[i][0]}`
      );
    }

    // Fill the first row of the DP table
    for (let j = 1; j <= n; j++) {
      dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
      logs.push(
        `Checking s2[0..${j - 1}] (${s2.slice(0, j)}) with s3[0..${j - 1}] (${s3.slice(
          0,
          j
        )}): dp[0][${j}] = ${dp[0][j]}`
      );
    }

    // Fill the rest of the DP table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] =
          (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
          (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);

        if (dp[i][j]) {
          logs.push(
            `Checking s1[0..${i - 1}] (${s1.slice(0, i)}) and s2[0..${j - 1}] (${s2.slice(
              0,
              j
            )}) with s3[0..${i + j - 1}] (${s3.slice(0, i + j)}): dp[${i}][${j}] = true`
          );
        } else {
          logs.push(
            `Checking s1[0..${i - 1}] (${s1.slice(0, i)}) and s2[0..${j - 1}] (${s2.slice(
              0,
              j
            )}) with s3[0..${i + j - 1}] (${s3.slice(0, i + j)}): dp[${i}][${j}] = false`
          );
        }
      }
    }

    setDp(dp); // Save the final dp table
    setLogs(logs); // Save the logs
    setResult(dp[m][n]); // Final result
  };

  const handleCheck = () => {
    setDp([]);
    setLogs([]);
    setResult(null);
    isInterleave(s1, s2, s3);
  };

  return (
    <div className="visualizer-container">
      <h2>Interleaving Strings Visualizer</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter String s1"
          value={s1}
          onChange={(e) => setS1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter String s2"
          value={s2}
          onChange={(e) => setS2(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter String s3"
          value={s3}
          onChange={(e) => setS3(e.target.value)}
        />
        <button onClick={handleCheck}>Check Interleaving</button>
      </div>

      {result !== null && (
        <div className="result-section">
          <h3>
            Result: {result ? "Yes, s3 is interleaving." : "No, s3 is not interleaving."}
          </h3>
        </div>
      )}

      {dp.length > 0 && (
        <div className="dp-section">
          <h3>DP Table</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                {[...Array(s2.length + 1)].map((_, j) => (
                  <th key={j}>{j === 0 ? "-" : s2[j - 1]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dp.map((row, i) => (
                <tr key={i}>
                  <td>{i === 0 ? "-" : s1[i - 1]}</td>
                  {row.map((cell, j) => (
                    <td key={j}>{cell ? "T" : "F"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {logs.length > 0 && (
        <div className="logs-section">
          <h3>Logs</h3>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterleaveVisualizer;
