import React, { useState } from "react";

const WordBreakVisualizer = () => {
  const [inputString, setInputString] = useState("");
  const [wordDict, setWordDict] = useState("");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const visualizeWordBreak = (s, dict) => {
    const dp = Array(s.length + 1).fill(false);
    dp[s.length] = true;
    const stepLogs = [];

    for (let i = s.length - 1; i >= 0; i--) {
      stepLogs.push({ index: i, substring: s.slice(i), status: "Checking..." });
      for (let word of dict) {
        if (i + word.length <= s.length && s.slice(i, i + word.length) === word) {
          dp[i] = dp[i + word.length];
          stepLogs.push({
            index: i,
            substring: s.slice(i, i + word.length),
            word,
            status: dp[i] ? "Matched" : "Failed",
          });
          if (dp[i]) break;
        }
      }
    }
    setResult(dp[0]);
    setSteps(stepLogs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dict = wordDict.split(",").map((word) => word.trim());
    visualizeWordBreak(inputString, dict);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Word Break Problem Visualizer</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Input String: </label>
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
        </div>
        <div>
          <label>Word Dictionary (comma-separated): </label>
          <input
            type="text"
            value={wordDict}
            onChange={(e) => setWordDict(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Visualize
        </button>
      </form>

      {steps.length > 0 && (
        <div>
          <h2>Visualization Steps:</h2>
          <div>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: step.status === "Matched" ? "#d4edda" : "#f8d7da",
                }}
              >
                <p>
                  <strong>Index:</strong> {step.index}
                </p>
                <p>
                  <strong>Substring:</strong> {step.substring}
                </p>
                {step.word && (
                  <p>
                    <strong>Word Matched:</strong> {step.word}
                  </p>
                )}
                <p>
                  <strong>Status:</strong> {step.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {result !== null && (
        <div style={{ marginTop: "20px" }}>
          <h2>Result:</h2>
          <p>
            Can the string "{inputString}" be segmented?{" "}
            <strong>{result ? "Yes" : "No"}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default WordBreakVisualizer;
