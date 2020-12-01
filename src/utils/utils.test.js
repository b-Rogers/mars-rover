import {
  cardinalDirectionConverter,
  validateDirection,
  validateCoordinates,
  findNewCoordinates,
} from './index';

test('cardinalDirectionConverter converts from cardinal direction to degrees', function () {
  const output = cardinalDirectionConverter('N');

  expect(output).not.toBe('N');
  expect(output).toBe(0);
});

test('cardinalDirectionConverter converts from degrees to cardinal direction', function () {
  const output = cardinalDirectionConverter(0);

  expect(output).not.toBe(0);
  expect(output).toBe('N');
});

test('validateDirection resets degress when at 360', function () {
  const output = validateDirection(360);

  expect(output).not.toBe(360);
  expect(output).toBe(0);
});

test('validateCoordinates stops the rover going above the grid size', function () {
  const { validatedCoordinatesY } = validateCoordinates(5, 6, 5, 5);

  expect(validatedCoordinatesY).not.toBe(6);
  expect(validatedCoordinatesY).toBe(5);
});

test('validateCoordinates stops the rover going below the grid size', function () {
  const { validatedCoordinatesY } = validateCoordinates(5, -1, 5, 5);

  expect(validatedCoordinatesY).not.toBe(-1);
  expect(validatedCoordinatesY).toBe(0);
});

test('cardinalDirectionConverter converts from degrees to cardinal direction', function () {
  const mockState = {
    gridSizeX: 5,
    gridSizeY: 5,
    coordinatesX: 1,
    coordinatesY: 1,
    cardinalDirection: 'N',
  };
  const { coordinatesX, coordinatesY, cardinalDirection } = findNewCoordinates(
    mockState
  );

  expect(coordinatesY).not.toBe(1);
  expect(coordinatesY).toBe(2);

  expect(coordinatesX).not.toBe(2);
  expect(coordinatesX).toBe(1);

  expect(cardinalDirection).not.toBe('');
  expect(cardinalDirection).toBe('N');
});
