import {
  validateDegrees,
  findNewCoordinates,
  degreesFromCardinalDirection,
  cardinalDirectionFromDegrees,
  validateCoordinates,
  validateGridSize,
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
      return {
        ...state,
        cardinalDirection: cardinalDirectionFromDegrees(validatedDegrees),
      };
    }
    case 'KeyM':
      // Get new coordinates; based on direction and position
      return {
        ...state,
        coordinates: findNewCoordinates(state),
      };
    case 'input':
      const { name, value } = action.payload || {};
      if (name && value) {
        const gridSizeX = name.includes('gridSizeX');
        const gridSizeY = name.includes('gridSizeY');
        const coordinatesX = name.includes('coordinatesX');
        const coordinatesY = name.includes('coordinatesY');

        let newCoordinates = {
          x: coordinatesX ? parseInt(value) : state.coordinates.x,
          y: coordinatesY ? parseInt(value) : state.coordinates.y,
        };
        let newGridSize = {
          x: gridSizeX ? parseInt(value) : state.gridSize.x,
          y: gridSizeY ? parseInt(value) : state.gridSize.y,
        };

        newCoordinates = validateCoordinates(newCoordinates, state.gridSize);
        newGridSize = validateGridSize(newGridSize);

        return {
          ...state,
          gridSize: newGridSize,
          coordinates: newCoordinates,
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
