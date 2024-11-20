import React, { useState } from 'react';
import './MaxProductSubarray.css';

const MaxProductSubarray = () => {
  const [steps, setSteps] = useState([]);

  const calculateMaxProduct = (arr) => {
    let n = arr.length;
    if (n === 0) return;

    let currentMax = arr[0];
    let currentMin = arr[0];
    let maxProduct = arr[0];
    let newSteps = [
      { index: 0, element: arr[0], currentMax, currentMin, maxProduct }
    ];

    for (let i = 1; i < n; i++) {
      const temp = currentMax;
      currentMax = Math.max(arr[i], Math.max(currentMax * arr[i], currentMin * arr[i]));
      currentMin = Math.min(arr[i], Math.min(temp * arr[i], currentMin * arr[i]));
      maxProduct = Math.max(maxProduct, currentMax);

      newSteps.push({ index: i, element: arr[i], currentMax, currentMin, maxProduct });
    }

    setSteps(newSteps);
  };

  const inputArray = [2, 3, -2, 4]; // Example input array

  return (
    <div className="max-product-container">
      <h1 className="title">Maximum Product Subarray Visualization</h1>
      <button className="visualize-btn" onClick={() => calculateMaxProduct(inputArray)}>
        Visualize
      </button>
      <div>
        <h2 className="input-array">Input Array: {JSON.stringify(inputArray)}</h2>
        {steps.length > 0 && (
          <table className="visualization-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Element</th>
                <th>Current Max</th>
                <th>Current Min</th>
                <th>Max Product</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, idx) => (
                <tr key={idx}>
                  <td>{step.index}</td>
                  <td>{step.element}</td>
                  <td>{step.currentMax}</td>
                  <td>{step.currentMin}</td>
                  <td>{step.maxProduct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MaxProductSubarray;
