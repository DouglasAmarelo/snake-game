import React from 'react';

import './styled.css';

const Joystick = ({ onKeyDown }) => {
  return (
    <div className="joystick">
      <button
        className="joystick__button up"
        onClick={e => onKeyDown(e.target.getAttribute('keycode'))}
        keycode="ArrowUp"
      >
        Up
      </button>
      <button
        className="joystick__button right"
        onClick={e => onKeyDown(e.target.getAttribute('keycode'))}
        keycode="ArrowRight"
      >
        Right
      </button>
      <button
        className="joystick__button left"
        onClick={e => onKeyDown(e.target.getAttribute('keycode'))}
        keycode="ArrowLeft"
      >
        Left
      </button>
      <button
        className="joystick__button bottom"
        onClick={e => onKeyDown(e.target.getAttribute('keycode'))}
        keycode="ArrowDown"
      >
        Bottom
      </button>
    </div>
  );
};

export default Joystick;
