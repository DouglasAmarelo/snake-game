import React from 'react';

const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const snakeStyle = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return (
          <div
            className="snake-dot"
            key={`snake-${i}`}
            style={snakeStyle}
          ></div>
        );
      })}
    </div>
  );
};

export default Snake;
