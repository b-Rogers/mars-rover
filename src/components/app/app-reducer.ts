import {
  validateDegrees,
  findNewCoordinates,
  degreesFromCardinalDirection,
  cardinalDirectionFromDegrees,
} from '../../utils';

interface Ipayload {
  value: string;
  name?: string;
}

export interface IAction {
  type: string;
  payload?: Ipayload;
}

export interface IState {
  gridSize: {
    x: number;
    y: number;
  };
  coordinates: {
    x: number;
    y: number;
  };
  cardinalDirection: string;
}

export function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'KeyL': {
      // Converts from Cardinal direction to degrees
      const degrees =
        degreesFromCardinalDirection(state.cardinalDirection) - 90;
      // Reset the degrees if it reaches 360
      const validatedDegrees = validateDegrees(degrees);
      return {
        ...state,
        cardinalDirection: cardinalDirectionFromDegrees(validatedDegrees),
      };
    }
    case 'KeyR': {
      // Converts from Cardinal direction to degrees
      const degrees =
        degreesFromCardinalDirection(state.cardinalDirection) + 90;
      // Reset the direction if it reaches 360
      const validatedDegrees = validateDegrees(degrees);
      // Update path to show route of rover
      return {
        ...state,
        cardinalDirection: cardinalDirectionFromDegrees(validatedDegrees),
      };
    }
    case 'KeyM':
      // Get new coordinates; based on direction and position
      const { coordinates } = findNewCoordinates(state);
      return {
        ...state,
        coordinates: coordinates,
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
