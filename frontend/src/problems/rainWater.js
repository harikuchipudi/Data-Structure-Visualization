import React, { useState } from "react";
import "./rainWaterStyles.css";

const TrappingWaterVisualization = () => {
  const [heights, setHeights] = useState([3, 0, 2, 0, 4]);
  const [waterLevels, setWaterLevels] = useState([]);
  const [totalWater, setTotalWater] = useState(0);

  const calculateWater = () => {
    const n = heights.length;
    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);
    const water = new Array(n).fill(0);

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
      water[i] = Math.min(leftMax[i], rightMax[i]) - heights[i];
      total += water[i];
    }

    setWaterLevels(water);
    setTotalWater(total);
  };

  const handleInputChange = (event) => {
    const value = event.target.value.split(",").map(Number);
    setHeights(value);
    setWaterLevels([]);
    setTotalWater(0);
  };

  return (
    <div className="container">
      <h2>Trapping Rainwater Visualization</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter heights (comma-separated)"
          onBlur={handleInputChange}
        />
        <button onClick={calculateWater}>Calculate Trapped Water</button>
      </div>

      <div className="bar-chart">
        {heights.map((height, index) => (
          <div key={index} className="bar">
            <div
              className="elevation"
              style={{
                height: `${height * 20}px`,
              }}
            ></div>
            {waterLevels[index] > 0 && (
              <div
                className="water"
                style={{
                  height: `${waterLevels[index] * 20}px`,
                }}
              ></div>
            )}
            <div className="label">{height}</div>
          </div>
        ))}
      </div>

      <h3>Total Trapped Water: {totalWater} units</h3>
    </div>
  );
};

export default TrappingWaterVisualization;
