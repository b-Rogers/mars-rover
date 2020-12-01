import { useEffect, useReducer } from 'react';

import { reducer } from './app-reducer';
import Grid from '../grid';
import Labels from '../labels';

import './app.scss';

const initialState = {
  gridSizeX: 10,
  gridSizeY: 10,
  coordinatesX: 0,
  coordinatesY: 0,
  cardinalDirection: 'N',
};

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Listener for user input; path for rover
  useEffect(() => {
    function listener(event: KeyboardEvent) {
      dispatch({
        type: event.code,
      });
    }
    window.addEventListener('keypress', listener);
    return function cleanup() {
      window.removeEventListener('keypress', listener);
    };
  }, [dispatch]);

  function handleChange(event: any) {
    switch (event.target.type) {
      case 'number':
        return dispatch({
          type: 'input',
          payload: {
            value: event.target.value,
            name: event.target.name,
          },
        });
      case 'select-one':
        return dispatch({
          type: 'select',
          payload: {
            value: event.target.value,
          },
        });
      default:
        throw new Error(`${event.target} handle failed`);
    }
  }

  return (
    <main className="app">
      <div className="app__container">
        <Grid
          gridSizeX={state.gridSizeX}
          gridSizeY={state.gridSizeY}
          coordinatesX={state.coordinatesX}
          coordinatesY={state.coordinatesY}
        />
        <Labels
          gridSizeX={state.gridSizeX}
          gridSizeY={state.gridSizeY}
          coordinatesX={state.coordinatesX}
          coordinatesY={state.coordinatesY}
          cardinalDirection={state.cardinalDirection}
          handleChange={handleChange}
        />
      </div>
    </main>
  );
}
