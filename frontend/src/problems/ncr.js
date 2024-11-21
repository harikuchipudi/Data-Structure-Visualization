import React, { useState } from "react";
import "./ncrStyles.css";

const NCrVisualization = () => {
  const [steps, setSteps] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [method, setMethod] = useState("modularInverse");

  const mod = 1000000007;

  const factorial = (n) => {
    let fact = [1];
    for (let i = 1; i <= n; i++) {
      fact[i] = (fact[i - 1] * i) % mod;
    }
    return fact;
  };

  const inverseModulo = (a) => {
    return power(a, mod - 2);
  };

  const power = (base, exp) => {
    let result = 1;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return result;
  };

  const nCrModular = (n, r) => {
    if (r > n) return 0;

    // Step-by-step factorial computation
    let fact = factorial(n);
    let nume = fact[n];
    let denom = (fact[r] * fact[n - r]) % mod;
    let result = (nume * inverseModulo(denom)) % mod;

    setFinalResult(result);

    // Capturing steps for visualization
    let iterations = [
      {
        step: "Precomputing Factorials",
        factorials: fact,
      },
      {
        step: "Calculating Numerator",
        value: nume,
      },
      {
        step: "Calculating Denominator",
        value: denom,
      },
      {
        step: "Calculating Modular Inverse",
        value: inverseModulo(denom),
      },
      {
        step: "Final Result",
        value: result,
      },
    ];
    setSteps(iterations);
  };

  const nCrIterative = (n, r) => {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    
    // Minimize the r value to avoid large operations
    r = Math.min(r, n - r);

    let result = 1;
    let iterations = [];
    for (let i = 1; i <= r; i++) {
      result *= (n - r + i);
      result /= i;
      iterations.push({
        step: `Iteration ${i}`,
        currentResult: result,
        numerator: n - r + i,
        denominator: i,
      });
    }

    setFinalResult(result);
    setSteps(iterations);
  };

  const handleCalculate = (n, r) => {
    if (method === "modularInverse") {
      nCrModular(n, r);
    } else {
      nCrIterative(n, r);
    }
  };

  return (
    <div className="ncr-container">
      <h1>nCr Visualization</h1>
      <div className="input-container">
        <label>
          n:
          <input type="number" id="n" defaultValue="5" />
        </label>
        <label>
          r:
          <input type="number" id="r" defaultValue="2" />
        </label>
        <select onChange={(e) => setMethod(e.target.value)} value={method}>
          <option value="modularInverse">Modular Inverse Approach</option>
          <option value="iterative">Iterative Approach</option>
        </select>
        <button onClick={() => handleCalculate(5, 2)}>Calculate</button>
      </div>

      {steps.length > 0 && (
        <div className="steps-container">
          <h2>Steps:</h2>
          <ul>
            {steps.map((step, idx) => (
              <li key={idx}>
                <strong>{step.step}:</strong> {step.value ? step.value : step.factorials}
              </li>
            ))}
          </ul>
        </div>
      )}

      {finalResult !== null && (
        <div className="result">
          <h2>Result: {finalResult}</h2>
        </div>
      )}
    </div>
  );
};

export default NCrVisualization;
