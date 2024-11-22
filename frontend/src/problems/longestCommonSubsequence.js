import React, { useState, useEffect } from "react";
import "./longestCSStyles.css";

const LCSVisualizer = () => {
  const [s1, setS1] = useState("abcde");
  const [s2, setS2] = useState("ace");
  const [dp, setDp] = useState([]);
  const [step, setStep] = useState(0);
  const [currentCell, setCurrentCell] = useState([0, 0]);
  const [maxSteps, setMaxSteps] = useState(0);

  useEffect(() => {
    // Initialize DP table with zeros
    const m = s1.length;
    const n = s2.length;
    const newDp = Array(m + 1)
      .fill(0)
      .map(() => Array(n + 1).fill(0));
    setDp(newDp);
    setMaxSteps((m + 1) * (n + 1));
  }, [s1, s2]);

  const processStep = () => {
    const m = s1.length;
    const n = s2.length;
    const newDp = [...dp];
    const i = Math.floor(step / (n + 1));
    const j = step % (n + 1);

    if (i > 0 && j > 0) {
      if (s1[i - 1] === s2[j - 1]) {
        newDp[i][j] = newDp[i - 1][j - 1] + 1;
      } else {
        newDp[i][j] = Math.max(newDp[i - 1][j], newDp[i][j - 1]);
      }
    }

    setDp(newDp);
    setCurrentCell([i, j]);
    setStep((prev) => prev + 1);
  };

  const reset = () => {
    setStep(0);
    setCurrentCell([0, 0]);
    setDp(dp.map((row) => row.map(() => 0)));
  };

  return (
    <div className="lcs-visualizer">
      <h1>Longest Common Subsequence Visualizer</h1>
      <div className="controls">
        <input
          type="text"
          value={s1}
          onChange={(e) => setS1(e.target.value)}
          placeholder="Enter String 1"
        />
        <input
          type="text"
          value={s2}
          onChange={(e) => setS2(e.target.value)}
          placeholder="Enter String 2"
        />
        <button onClick={processStep} disabled={step >= maxSteps}>
          Step
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <Grid dp={dp} s1={s1} s2={s2} currentCell={currentCell} />
    </div>
  );
};

const Grid = ({ dp, s1, s2, currentCell }) => {
  return (
    <div className="grid-container">
      <table>
        <thead>
          <tr>
            <th></th>
            {s2.split("").map((char, index) => (
              <th key={index}>{char}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dp.map((row, i) => (
            <tr key={i}>
              <th>{i > 0 ? s1[i - 1] : ""}</th>
              {row.map((value, j) => (
                <td
                  key={j}
                  className={
                    currentCell[0] === i && currentCell[1] === j
                      ? "current-cell"
                      : ""
                  }
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LCSVisualizer;
