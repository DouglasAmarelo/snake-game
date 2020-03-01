import React from 'react';

import './styled.css';

const Score = ({ score = 0 }) => {
  return (
    <div className="score">
      <span>Score:</span> <div>{score}</div>
    </div>
  );
};

export default Score;
