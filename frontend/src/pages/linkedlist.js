import React, { useState } from 'react';
import './linkedlistStyles.css';

function LinkedListVisualization() {
  const [list, setList] = useState([5, 10, 15]);

  const addElement = () => {
    setList([Math.floor(Math.random() * 100), ...list]);
  };

  return (
    <div className="linkedlist-container">
      <h2>Linked List Visualization</h2>
      <button className="add-element-btn" onClick={addElement}>Add Node</button>
      <div className="linkedlist">
        {list.map((el, index) => (
          <div key={index} className="linkedlist-item">
            {el}
            {index < list.length - 1 && <span className="arrow">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedListVisualization;
