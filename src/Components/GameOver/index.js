import React from 'react';

import './styled.css';

const GameOver = ({ restartGame }) => {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <button onClick={restartGame}>Start again</button>
    </div>
  );
};

export default GameOver;
