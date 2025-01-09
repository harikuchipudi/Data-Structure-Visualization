import React, { useState } from "react";

// Utility to initialize a chessboard
const initializeBoard = (n) => Array.from({ length: n }, () => Array(n).fill("empty"));

// Step-by-step recursive N-Queens solver
const solveNQueens = (n, row, board, solutions, steps) => {
  if (row === n) {
    solutions.push(board.map((r) => [...r])); // Deep copy of the board
    return;
  }

  for (let col = 0; col < n; col++) {
    if (isSafe(row, col, board, n)) {
      board[row][col] = "queen"; // Place queen
      markAttacks(row, col, board, n, "mark"); // Mark attacked cells
      steps.push(board.map((r) => [...r])); // Save the current state

      solveNQueens(n, row + 1, board, solutions, steps); // Recursive call

      markAttacks(row, col, board, n, "unmark"); // Unmark attacked cells
      board[row][col] = "empty"; // Remove queen
      steps.push(board.map((r) => [...r])); // Save the backtracking state
    }
  }
};

// Check if the cell is safe
const isSafe = (row, col, board, n) => {
  for (let i = 0; i < row; i++) {
    if (board[i][col] === "queen") return false;
  }

  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    if (board[row - i][col - i] === "queen") return false;
  }

  for (let i = 1; row - i >= 0 && col + i < n; i++) {
    if (board[row - i][col + i] === "queen") return false;
  }

  return true;
};

// Mark or unmark attacked cells
const markAttacks = (row, col, board, n, action) => {
  const markValue = action === "mark" ? "attacked" : "empty";

  for (let i = row + 1; i < n; i++) board[i][col] = markValue;

  for (let i = 1; row + i < n && col - i >= 0; i++) board[row + i][col - i] = markValue;

  for (let i = 1; row + i < n && col + i < n; i++) board[row + i][col + i] = markValue;
};

// React component for N-Queens visualization
const NQueensVisualizer = () => {
  const [n, setN] = useState(4); // Default value for n
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNChange = (e) => {
    setN(Number(e.target.value));
  };

  const startVisualization = () => {
    const board = initializeBoard(n);
    const solutions = [];
    const stepsList = [];
    solveNQueens(n, 0, board, solutions, stepsList);
    setSteps(stepsList);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>N-Queens Problem Visualization</h1>
      <div>
        <label htmlFor="nInput">Number of Queens: </label>
        <input
          id="nInput"
          type="number"
          value={n}
          onChange={handleNChange}
          style={{ width: "50px", margin: "10px" }}
          min="1"
        />
      </div>
      <button
        onClick={startVisualization}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Start Visualization
      </button>
      <button
        onClick={prevStep}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Previous Step
      </button>
      <button
        onClick={nextStep}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Next Step
      </button>

      <div style={{ marginTop: "20px" }}>
        {steps.length > 0 && (
          <Chessboard board={steps[currentStep]} />
        )}
      </div>
    </div>
  );
};

// Chessboard Component
// Chessboard Component
const Chessboard = ({ board }) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board.length}, 1fr)`, // Ensures equal width for all columns
          gridAutoRows: "1fr", // Ensures equal height for rows
          gap: "2px",
          justifyContent: "center",
          width: "400px", // Fixed width for the chessboard
          height: "400px", // Fixed height for the chessboard to make cells square
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                backgroundColor: (i + j) % 2 === 0 ? "#f0d9b5" : "#b58863", // Alternating colors for the chessboard
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: cell === "queen" ? "white" : "black",
                border: "1px solid black",
                aspectRatio: "1 / 1", // Ensures the cells are square
              }}
            >
              {cell === "queen" ? "♛" : cell === "attacked" ? "•" : ""}
            </div>
          ))
        )}
      </div>
    );
  };
  

export default NQueensVisualizer;
