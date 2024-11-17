import React, { useState } from "react";
import "./knapsackStyles.css";
function KnapSack01() {

    const [values, setValues] = useState([]);
    const [weights, setWeights] = useState([]);
    const [capacity, setCapacity] = useState([]);
    const [result, setResult] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [dpGrid, setDpGrid] = useState([]);

    const findMaxValue = () => {
        const n = values.length;
        const dp = Array(capacity+1).fill(0);
        const grid = [dp.slice()];

        for(let i=0; i<n; i++){
            for(let j=capacity; j>= weights[i]; j--){
                dp[j] = Math.max(dp[j], values[i] + dp[j-weights[i]]);
            }
            grid.push(dp.slice());
        }

        setDpGrid(grid);
        setMaxValue(dp[capacity]);
    };

    const handleInputChange = (e, type) => {
        const value = e.target.value.split(",").map(Number);
        if(type === "values") setValues(value);
        if(type === "weights") setWeights(value);
    };

    const handleCapacityChange = (e) => {
        setCapacity(Number(e.target.value));
    }

    return(
        <div className="knapsack-container">
            <h2>O/1 KnapSack Visualization</h2>

            <div className="input-section">
                <label>
                    Values (comma-separated);
                    <input type="text" onChange={(e) => handleInputChange(e, "values")} placeholder="e.g, 10, 20, 30"/> 
                </label>
                <label>
                    Weights (comma-separated);
                    <input type="text" onChange={(e) => handleInputChange(e, "weights")} placeholder="e.g, 1, 2, 3" />
                </label>
                <label>
                    Capacity:
                    <input type="number" onChange={handleCapacityChange} placeholder="e.g., 50" />
                </label>
                <button onClick={findMaxValue}>Calculate</button>
            </div>

            <div className="dp-grid">
                <h3>DP Array Progress</h3>
                {dpGrid.map((row, index) => (
                    <div key={index} className="dp-row">
                        {row.map((cell, idx) => (
                            <div key={idx} className="dp-cell"> 
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {maxValue !== null && (
            <div className="result-section">
            <h3>Maximum Value: {maxValue}</h3>
            </div>
        )}


        </div>
    )
}

export default KnapSack01;