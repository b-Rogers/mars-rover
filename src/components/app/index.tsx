import { useEffect, useReducer } from 'react';

import { reducer } from './app-reducer';
import Grid from '../grid';
import Labels from '../labels';

import './app.scss';

const initialState = {
  gridSize: {
    x: 10,
    y: 10,
  },
  coordinates: {
    x: 0,
    y: 0,
  },
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

  return (
    <main className="app">
      <div className="app__container">
        <Grid gridSize={state.gridSize} coordinates={state.coordinates} />
        <Labels {...state} dispatch={dispatch} />
      </div>
    </main>
  );
}
