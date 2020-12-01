import { IState } from '../components/app/app-reducer';

export function cardinalDirectionFromDegrees(degrees: number) {
  switch (degrees) {
    case 0:
      return 'N';
    case 90:
    case -270:
      return 'E';
    case 180:
    case -180:
      return 'S';
    case 270:
    case -90:
      return 'W';
    default:
      return 'N';
  }
}

export function degreesFromCardinalDirection(cardinalDirection: string) {
  switch (cardinalDirection) {
    case 'N':
      return 0;
    case 'E':
      return 90;
    case 'S':
      return 180;
    case 'W':
      return 270;
    default:
      return 0;
  }
}

export function findNewCoordinates({
  cardinalDirection,
  coordinates,
  gridSize,
}: IState) {
  const degrees = degreesFromCardinalDirection(cardinalDirection);
  let newCoordinates = coordinates;
  switch (degrees) {
    case 0:
      newCoordinates = {
        ...coordinates,
        y: coordinates.y + 1,
      };
      break;
    case 90:
      newCoordinates = {
        ...coordinates,
        x: coordinates.x + 1,
      };
      break;
    case 180:
      newCoordinates = {
        ...coordinates,
        y: coordinates.y - 1,
      };
      break;
    case 270:
      newCoordinates = {
        ...coordinates,
        x: coordinates.x - 1,
      };
      break;
  }

  return validateCoordinates(newCoordinates, gridSize);
}

export function validateDegrees(degrees: number) {
  if (degrees === -360 || degrees === 360) {
    return 0;
  } else {
    return degrees;
  }
}

export function validateCoordinates(
  coordinates: IState['coordinates'],
  gridSize: IState['gridSize']
) {
  const validatedCoordinates = coordinates;
  if (coordinates.x > gridSize.x) {
    validatedCoordinates.x = gridSize.x;
  } else if (coordinates.y > gridSize.y) {
    validatedCoordinates.y = gridSize.y;
  } else if (coordinates.x < 0) {
    validatedCoordinates.x = 0;
  } else if (coordinates.y < 0) {
    validatedCoordinates.y = 0;
  }
  return validatedCoordinates;
}

export function validateGridSize(gridSize: IState['gridSize']) {
  const validatedGridSize = gridSize;
  if (gridSize.x < 1) validatedGridSize.x = 1;
  if (gridSize.y < 1) validatedGridSize.y = 1;
  if (gridSize.x > 10) validatedGridSize.x = 10;
  if (gridSize.y > 10) validatedGridSize.y = 10;
  return validatedGridSize;
}
