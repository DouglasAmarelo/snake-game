import React, { useState, useEffect } from 'react';
import Snake from './Components/Snake';
import Food from './Components/Food';
import { getRandomCoordinates } from './utils/randomCoordinates';
import GameOver from './Components/GameOver';

const App = () => {
  const initialState = [
    [0, 0],
    [2, 0]
  ];
  const [gameOver, setGameOver] = useState(false);
  const [directions, setDirections] = useState({ direction: 'RIGHT' });
  const [speed, setSpeed] = useState(300);
  const [food, setFood] = useState([0, 0]);
  const [snakeDots, setSnakeDots] = useState(initialState);

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
    const snakeHead = snakeDots[snakeDots.length - 1];
    const snakeFood = food;

    if (snakeHead[0] === snakeFood[0] && snakeHead[1] === snakeFood[1]) {
      setFood(getRandomCoordinates());
      enlargeSnake(snakeDots);
      increaseSpeed();
    }
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
      UP: () => [snakeHead[0], snakeHead[1] - 2],
      DOWN: () => [snakeHead[0], snakeHead[1] + 2],
      LEFT: () => [snakeHead[0] - 2, snakeHead[1]],
      RIGHT: () => [snakeHead[0] + 2, snakeHead[1]]
    };

    const newDirection = movements[direction]();

    dots.push(newDirection);
    dots.shift();
    setSnakeDots(dots);
  };

  const onKeyDown = e => {
    const keymap = {
      38: () => setDirections({ direction: 'UP' }),
      40: () => setDirections({ direction: 'DOWN' }),
      37: () => setDirections({ direction: 'LEFT' }),
      39: () => setDirections({ direction: 'RIGHT' })
    };

    return (keymap[e.keyCode] && keymap[e.keyCode]()) || false;
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
  }, [snakeDots, directions]);

  useEffect(() => {
    checkIfEat(snakeDots, food);
  }, [snakeDots, food]);

  useEffect(() => {
    setFood(getRandomCoordinates());
    document.onkeydown = onKeyDown;
  }, []);

  return (
    <div className="App">
      <h1 className="page-title">Snake Game</h1>
      <div className="game-area">
        {!gameOver ? (
          <>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
          </>
        ) : (
          <GameOver />
        )}
      </div>
    </div>
  );
};

export default App;
