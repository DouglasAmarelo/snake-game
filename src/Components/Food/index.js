import React from 'react';

const Food = ({ dot }) => {
  const foodStyle = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`
  };

  return <div className="snake-food" style={foodStyle}></div>;
};

export default Food;
