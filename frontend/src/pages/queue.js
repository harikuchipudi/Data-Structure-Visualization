import React, { useState } from 'react';
import './queueStyles.css';

function QueueVisualization() {
  const [queue, setQueue] = useState([1, 2, 3]);

  const enqueueElement = () => {
    setQueue([...queue, Math.floor(Math.random() * 100)]);
  };

  const dequeueElement = () => {
    setQueue(queue.slice(1)); // removes the first element
  };

  return (
    <div className="queue-container">
      <h2>Queue Visualization</h2>
      <button className="enqueue-btn" onClick={enqueueElement}>Enqueue</button>
      <button className="dequeue-btn" onClick={dequeueElement} disabled={queue.length === 0}>
        Dequeue
      </button>
      <div className="queue">
        {queue.map((el, index) => (
          <div key={index} className="queue-item">
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QueueVisualization;
