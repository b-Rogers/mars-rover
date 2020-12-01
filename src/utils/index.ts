import { IState } from '../components/app/app-reducer';

export function cardinalDirectionFromDegrees(degrees: number) {
  switch (degrees) {
    case 0:
      return 'N';
    case 90:
      return 'E';
    case 180:
      return 'S';
    case 270:
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
  switch (degrees) {
    case 0:
      coordinates.y += 1;
      break;
    case 90:
      coordinates.x += 1;
      break;
    case 180:
      coordinates.y -= 1;
      break;
    case 270:
      coordinates.x -= 1;
      break;
  }

  return {
    coordinates: validateCoordinates(coordinates, gridSize),
  };
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
