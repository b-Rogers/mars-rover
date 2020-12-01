// Convert cardinal direction to a number for the app
// And convert back to string to showcase to the user
export function cardinalDirectionConverter(cardinalDirection: string | number) {
  switch (cardinalDirection) {
    case 'N':
      return 0;
    case 'E':
      return 90;
    case 'S':
      return 180;
    case 'W':
      return 270;
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
      return '';
  }
}

interface IfindNewCoordinates {
  gridSizeX: number;
  gridSizeY: number;
  coordinatesX: number;
  coordinatesY: number;
  cardinalDirection: string | number;
}

export function findNewCoordinates({
  cardinalDirection,
  coordinatesX,
  coordinatesY,
  gridSizeX,
  gridSizeY,
}: IfindNewCoordinates) {
  const direction = cardinalDirectionConverter(cardinalDirection);
  switch (direction) {
    case 0:
      coordinatesY += 1;
      break;
    case 90:
      coordinatesX += 1;
      break;
    case 180:
      coordinatesY -= 1;
      break;
    case 270:
      coordinatesX -= 1;
      break;
    default:
      return {
        coordinatesX: coordinatesX,
        coordinatesY: coordinatesY,
      };
  }

  // Ensure the rover does not leave the plateau
  const { validatedCoordinatesX, validatedCoordinatesY } = validateCoordinates(
    coordinatesX,
    coordinatesY,
    gridSizeX,
    gridSizeY
  );

  return {
    coordinatesX: validatedCoordinatesX,
    coordinatesY: validatedCoordinatesY,
    cardinalDirection: cardinalDirectionConverter(direction),
  };
}

export function validateDirection(direction: number) {
  if (direction === -360 || direction === 360) {
    return 0;
  } else {
    return direction;
  }
}

export function validateCoordinates(
  coordinatesX: number,
  coordinatesY: number,
  gridSizeX: number,
  gridSizeY: number
) {
  if (coordinatesX > gridSizeX) {
    coordinatesX = gridSizeX;
  } else if (coordinatesY > gridSizeY) {
    coordinatesY = gridSizeY;
  } else if (coordinatesX < 0) {
    coordinatesX = 0;
  } else if (coordinatesY < 0) {
    coordinatesY = 0;
  }
  return {
    validatedCoordinatesX: coordinatesX,
    validatedCoordinatesY: coordinatesY,
  };
}
