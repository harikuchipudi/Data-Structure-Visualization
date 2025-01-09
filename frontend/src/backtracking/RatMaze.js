import React, { useState } from "react";

const MazeSolver = () => {
  const initialMaze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1],
  ];

  const n = initialMaze.length;
  const [visited, setVisited] = useState(Array.from({ length: n }, () => Array(n).fill(false)));
  const [solutions, setSolutions] = useState([]);
  const [steps, setSteps] = useState([]); // To track intermediary steps

  const directions = [
    { row: -1, col: 0, move: "U" }, // Up
    { row: 1, col: 0, move: "D" },  // Down
    { row: 0, col: -1, move: "L" }, // Left
    { row: 0, col: 1, move: "R" },  // Right
  ];

  const solveMaze = () => {
    const visitedMatrix = Array.from({ length: n }, () => Array(n).fill(false));
    const allSolutions = [];
    const newSteps = [];

    const backtrack = (row, col, path) => {
      // Out of bounds or invalid cell
      if (
        row < 0 ||
        col < 0 ||
        row >= n ||
        col >= n ||
        initialMaze[row][col] === 0 ||
        visitedMatrix[row][col]
      ) {
        newSteps.push({
          row,
          col,
          path,
          status: "Fail",
        });
        return;
      }

      // Mark cell as visited
      visitedMatrix[row][col] = true;
      newSteps.push({
        row,
        col,
        path,
        status: "Visited",
      });

      // Check if the destination is reached
      if (row === n - 1 && col === n - 1) {
        allSolutions.push(path);
        newSteps.push({
          row,
          col,
          path,
          status: "Success",
        });
        visitedMatrix[row][col] = false; // Unmark for other paths
        return;
      }

      // Explore all possible directions
      for (const { row: dRow, col: dCol, move } of directions) {
        backtrack(row + dRow, col + dCol, path + move);
      }

      // Backtrack: Unmark the cell
      visitedMatrix[row][col] = false;
      newSteps.push({
        row,
        col,
        path,
        status: "Backtrack",
      });
    };

    // Start backtracking
    backtrack(0, 0, "");
    setSolutions(allSolutions);
    setSteps(newSteps);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Maze Solver: All Possible Paths</h1>
      <div style={styles.grid(n)}>
        {initialMaze.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                ...styles.cell,
                backgroundColor: visited[i][j]
                  ? "lightblue"
                  : cell === 0
                  ? "black"
                  : "white",
              }}
            >
              {cell === 1 ? "" : "X"}
            </div>
          ))
        )}
      </div>
      <button onClick={solveMaze} style={styles.button}>
        Solve Maze
      </button>
      <div style={styles.info}>
        <h2>Solutions Found: {solutions.length}</h2>
        <ul>
          {solutions.map((solution, idx) => (
            <li key={idx}>{solution}</li>
          ))}
        </ul>
        <h3>Steps:</h3>
        <div>
          {steps.map((step, idx) => (
            <div key={idx} style={styles.step}>
              <h4>
                Step {idx + 1}: {step.status} - Position: ({step.row}, {step.col}) Path:{" "}
                {step.path}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
    color: "#333",
  },
  grid: (n) => ({
    display: "grid",
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    width: "400px",
    border: "2px solid #999",
  }),
  cell: {
    aspectRatio: "1",
    border: "1px solid #999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
  info: {
    textAlign: "center",
    marginTop: "20px",
  },
  step: {
    marginTop: "20px",
  },
};

export default MazeSolver;
