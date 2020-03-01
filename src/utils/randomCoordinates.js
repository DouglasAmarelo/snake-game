export const getRandomCoordinates = snakeSize => {
  const min = 1;
  const max = 98;
  const x =
    Math.floor((Math.random() * (max - min + 1) + min) / snakeSize) * snakeSize;
  const y =
    Math.floor((Math.random() * (max - min + 1) + min) / snakeSize) * snakeSize;

  return [x, y];
};
