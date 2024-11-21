import React, { useState } from 'react';
import './arrayStyles.css';

function ArrayVisualization() {
  const [array, setArray] = useState([5, 10, 15, 20]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = () => {
    setArray(array.slice(0,-1));
  }

  return (
    <div className="array-container">
      <p className="title">Array</p>
      <button className="add-element-btn" onClick={addElement}>Add Element</button>
      <button className='add-element-btn' onClick={deleteElement}>Delete Element</button>
      <div className="array">
        {array.map((el, index) => (
          <div key={index} className="array-item">{el}</div>
        ))}
      </div>
    </div>
  );
}

export default ArrayVisualization;
