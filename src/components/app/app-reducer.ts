import {
  cardinalDirectionConverter,
  validateDirection,
  findNewCoordinates,
} from '../../utils';

interface Ipayload {
  value: string;
  name?: string;
}

interface Iaction {
  type: string;
  payload?: Ipayload;
}

interface Istate {
  gridSizeX: number;
  gridSizeY: number;
  coordinatesX: number;
  coordinatesY: number;
  cardinalDirection: string | number;
}

export function reducer(state: Istate, action: Iaction): Istate {
  let direction: number;
  switch (action.type) {
    case 'KeyL':
      // Converts from Cardinal direction to degrees
      direction =
        (cardinalDirectionConverter(state.cardinalDirection) as number) - 90;
      // Reset the direction if it reaches 360
      direction = validateDirection(direction);
      // Update path to show route of rover
      return {
        ...state,
        cardinalDirection: cardinalDirectionConverter(direction),
      };
    case 'KeyR':
      // Converts from Cardinal direction to degrees
      direction =
        (cardinalDirectionConverter(state.cardinalDirection) as number) + 90;
      // Reset the direction if it reaches 360
      direction = validateDirection(direction);
      // Update path to show route of rover
      return {
        ...state,
        cardinalDirection: cardinalDirectionConverter(direction),
      };
    case 'KeyM':
      // Get new coordinates; based on direction and position
      const {
        coordinatesX,
        coordinatesY,
        cardinalDirection,
      } = findNewCoordinates(state);
      // Update path to show route of rover
      return {
        ...state,
        coordinatesX: coordinatesX,
        coordinatesY: coordinatesY,
        cardinalDirection: cardinalDirection || state.cardinalDirection,
      };
    case 'input':
      if (action.payload?.name && action.payload?.value) {
        return {
          ...state,
          [action.payload.name]: parseInt(action.payload.value),
        };
      }
      return {
        ...state,
      };
    case 'select':
      return {
        ...state,
        cardinalDirection: action.payload?.value || state.cardinalDirection,
      };
    default:
      return {
        ...state,
      };
  }
}
