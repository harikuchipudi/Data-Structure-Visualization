import React, { useState } from "react";
import "./uniqueCharacterSorted.css";

const RemoveDuplicateLettersVisualizer = () => {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState("");

  const removeDuplicateLetters = (s) => {
    const steps = [];
    const alphabets = Array(26).fill(0); // Frequency array
    const visited = Array(26).fill(false); // Tracks visited characters
    const stack = [];

    for (let char of s) {
      alphabets[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      const charIndex = char.charCodeAt(0) - "a".charCodeAt(0);
      alphabets[charIndex]--; // Decrease frequency

      if (visited[charIndex]) {
        steps.push(
          `Skipping '${char}' as it is already in the stack: [${stack.join("")}]`
        );
        continue;
      }

      while (
        stack.length > 0 &&
        char < stack[stack.length - 1] &&
        alphabets[stack[stack.length - 1].charCodeAt(0) - "a".charCodeAt(0)] > 0
      ) {
        const removed = stack.pop();
        visited[removed.charCodeAt(0) - "a".charCodeAt(0)] = false;
        steps.push(
          `Popped '${removed}' from the stack as '${char}' is lexicographically smaller and '${removed}' appears later.`
        );
      }

      stack.push(char);
      visited[charIndex] = true;
      steps.push(
        `Pushed '${char}' onto the stack. Current stack: [${stack.join("")}]`
      );
    }

    setSteps(steps);
    setResult(stack.join(""));
  };

  const handleVisualize = () => {
    setSteps([]);
    setResult("");
    removeDuplicateLetters(input);
  };

  return (
    <div className="visualizer-container">
      <h2>Remove Duplicate Letters Visualizer</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a string"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleVisualize}>Visualize</button>
      </div>

      {steps.length > 0 && (
        <div className="steps-section">
          <h3>Steps</h3>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="result-section">
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default RemoveDuplicateLettersVisualizer;
