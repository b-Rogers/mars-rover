import {
  cardinalDirectionFromDegrees,
  degreesFromCardinalDirection,
  validateDegrees,
  validateCoordinates,
  findNewCoordinates,
} from './index';

test('degreesFromCardinalDirection converts from cardinal direction to degrees', function () {
  const output = degreesFromCardinalDirection('N');

  expect(output).not.toBe('N');
  expect(output).toBe(0);
});

test('cardinalDirectionFromDegrees converts from degrees to cardinal direction', function () {
  const output = cardinalDirectionFromDegrees(0);

  expect(output).not.toBe(0);
  expect(output).toBe('N');
});

test('validateDirection resets degress when at 360', function () {
  const output = validateDegrees(360);

  expect(output).not.toBe(360);
  expect(output).toBe(0);
});

test('validateCoordinates stops the rover going above the grid size', function () {
  const validatedCoordinates = validateCoordinates(
    { x: 5, y: 6 },
    { x: 5, y: 5 }
  );

  expect(validatedCoordinates.y).not.toBe(6);
  expect(validatedCoordinates.y).toBe(5);
});

test('validateCoordinates stops the rover going below the grid size', function () {
  const validatedCoordinates = validateCoordinates(
    { x: 5, y: -1 },
    { x: 5, y: 5 }
  );

  expect(validatedCoordinates.y).not.toBe(-1);
  expect(validatedCoordinates.y).toBe(0);
});

test('findNewCoordinates returns correct new coodinates', function () {
  const mockState = {
    gridSize: {
      x: 5,
      y: 5,
    },
    coordinates: {
      x: 1,
      y: 1,
    },
    cardinalDirection: 'N',
  };
  const coordinates = findNewCoordinates(mockState);

  expect(coordinates.y).not.toBe(1);
  expect(coordinates.y).toBe(2);

  expect(coordinates.x).not.toBe(2);
  expect(coordinates.x).toBe(1);
});
