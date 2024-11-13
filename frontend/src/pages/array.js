import React, { useState } from 'react';
import './arrayStyles.css';

function ArrayVisualization() {
  const [array, setArray] = useState([5, 10, 15, 20]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  return (
    <div className="array-container">
      <h2>Array Visualization</h2>
      <button className="add-element-btn" onClick={addElement}>Add Element</button>
      <div className="array">
        {array.map((el, index) => (
          <div key={index} className="array-item">{el}</div>
        ))}
      </div>
    </div>
  );
}

export default ArrayVisualization;
