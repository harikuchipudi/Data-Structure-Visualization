import React, { useState } from 'react';
import './stackStyles.css';

function StackVisualization() {
  const [stack, setStack] = useState([10, 20, 30, 40]);

  const pushElement = () => {
    setStack([Math.floor(Math.random() * 100), ...stack]);
  };

  const popElement = () => {
    setStack(stack.slice(1));
  };

  return (
    <div className="stack-container">
      <h2>Stack Visualization</h2>
      <button className="push-btn" onClick={pushElement}>Push</button>
      <button className="pop-btn" onClick={popElement}>Pop</button>
      <div className="stack">
        {stack.map((el, index) => (
          <div key={index} className="stack-item">{el}</div>
        ))}
      </div>
    </div>
  );
}

export default StackVisualization;
