import React, { useEffect, useState } from 'react';
import Snake from './Components/Snake';
import Food from './Components/Food';
import GameOver from './Components/GameOver';
import Joystick from './Components/Joystick';

import { getRandomCoordinates } from './utils/randomCoordinates';
import Score from './Components/Score';

const snakeSize = 4;
const INITIAL_STATE = {
  SNAKE_DOTS: [
    [0, 0],
    [4, 0]
  ],
  DIRECTION: { direction: 'RIGHT' },
  SPEED: 300,
  FOOD_POSITION: getRandomCoordinates(snakeSize),
  SCORE: 0
};

const App = () => {
  const [directions, setDirections] = useState(INITIAL_STATE.DIRECTION);
  const [speed, setSpeed] = useState(INITIAL_STATE.SPEED);
  const [snakeDots, setSnakeDots] = useState(INITIAL_STATE.SNAKE_DOTS);
  const [food, setFood] = useState(INITIAL_STATE.FOOD_POSITION);
  const [score, setScore] = useState(INITIAL_STATE.SCORE);
  const [gameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setDirections(INITIAL_STATE.DIRECTION);
    setSpeed(INITIAL_STATE.SPEED);
    setSnakeDots(INITIAL_STATE.SNAKE_DOTS);
    setFood(INITIAL_STATE.FOOD_POSITION);
    setScore(INITIAL_STATE.SCORE);
    setGameOver(false);
  };

  const checkIfOutOfBorders = snakeDots => {
    const gameArea = 100; // 100% da área
    const dots = [...snakeDots];
    const snakeHead = dots[dots.length - 1];
    const topRight = snakeHead[0];
    const bottomRight = snakeHead[1];
    const topLeft = snakeHead[0];
    const bottomLEft = snakeHead[1];

    if (
      topRight >= gameArea ||
      bottomRight >= gameArea ||
      topLeft < 0 ||
      bottomLEft < 0
    ) {
      setGameOver(true);
    }
  };

  const checkIfCollapsed = snakeDots => {
    const dots = [...snakeDots];
    const snakeHead = dots[dots.length - 1];

    dots.pop();
    dots.forEach(dot => {
      if (snakeHead[0] === dot[0] && snakeHead[1] === dot[1]) {
        setGameOver(true);
      }
    });
  };

  const checkIfEat = (snakeDots, food) => {
    const dots = [...snakeDots];
    const snakeHead = dots[dots.length - 1];
    const snakeFood = [...food];

    if (snakeHead[0] === snakeFood[0] && snakeHead[1] === snakeFood[1]) {
      setFood(getRandomCoordinates(snakeSize));
      enlargeSnake(dots);
      increaseSpeed();
    }
  };

  const updateScore = snakeDots => {
    const dots = [...snakeDots];
    const snakeLength = dots.length - 2;

    setScore(snakeLength);
  };

  const enlargeSnake = snakeDots => {
    const newSnake = [...snakeDots];

    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  };

  const moveSnake = (snakeDots, { direction }) => {
    if (!direction) return;

    const dots = [...snakeDots];
    const snakeHead = dots[dots.length - 1];
    const movements = {
      UP: () => [snakeHead[0], snakeHead[1] - snakeSize],
      DOWN: () => [snakeHead[0], snakeHead[1] + snakeSize],
      LEFT: () => [snakeHead[0] - snakeSize, snakeHead[1]],
      RIGHT: () => [snakeHead[0] + snakeSize, snakeHead[1]]
    };
    const newDirection = movements[direction]();

    dots.push(newDirection);
    dots.shift();
    setSnakeDots(dots);
  };

  const onKeyDown = e => {
    const keymap = {
      ArrowUp: () => setDirections({ direction: 'UP' }),
      ArrowDown: () => setDirections({ direction: 'DOWN' }),
      ArrowLeft: () => setDirections({ direction: 'LEFT' }),
      ArrowRight: () => setDirections({ direction: 'RIGHT' })
    };

    return (
      (keymap[e.key] && keymap[e.key]()) || (keymap[e] && keymap[e]()) || false
    );
  };

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      moveSnake(snakeDots, directions);
    }, speed);

    return () => clearInterval(interval);
  }, [snakeDots, directions, speed, gameOver]);

  useEffect(() => {
    checkIfOutOfBorders(snakeDots);
    checkIfCollapsed(snakeDots);
    checkIfEat(snakeDots, food);
    updateScore(snakeDots);
  }, [snakeDots, directions, food]);

  useEffect(() => {
    setFood(getRandomCoordinates(snakeSize));
    document.onkeydown = onKeyDown;
  }, []);

  return (
    <div className="App">
      <Score score={score} />

      <div className="game-area">
        {!gameOver ? (
          <>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
          </>
        ) : (
          <GameOver restartGame={restartGame} />
        )}
      </div>

      <Joystick onKeyDown={onKeyDown} />
    </div>
  );
};

export default App;
