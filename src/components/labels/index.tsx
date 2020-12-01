import { ChangeEvent } from 'react';
import { IState, IAction } from '../app/app-reducer';
import './labels.scss';

interface Ilabels {
  gridSize: IState['gridSize'];
  coordinates: IState['coordinates'];
  cardinalDirection: IState['cardinalDirection'];
  dispatch: React.Dispatch<IAction>;
}

export default function Labels({
  gridSize,
  coordinates,
  cardinalDirection,
  dispatch,
}: Ilabels) {
  function handleChange({
    target,
  }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    switch (target.type) {
      case 'number':
        return dispatch({
          type: 'input',
          payload: {
            value: target.value,
            name: target.name,
          },
        });
      case 'select-one':
        return dispatch({
          type: 'select',
          payload: {
            value: target.value,
          },
        });
      default:
        throw new Error(`${target} handle failed`);
    }
  }

  return (
    <div data-testid="labels" className="label-wrapper">
      <label>
        Grid size X:
        <input
          data-testid="gridSizeX"
          type="number"
          name="gridSizeX"
          value={gridSize.x}
          onChange={handleChange}
        />
      </label>
      <label>
        Grid size Y:
        <input
          data-testid="gridSizeY"
          type="number"
          name="gridSizeY"
          value={gridSize.y}
          onChange={handleChange}
        />
      </label>
      <label>
        Coordinates X:
        <input
          data-testid="coordinatesX"
          type="number"
          name="coordinatesX"
          value={coordinates.x}
          onChange={handleChange}
        />
      </label>
      <label>
        Coordinates Y:
        <input
          data-testid="coordinatesY"
          type="number"
          name="coordinatesY"
          value={coordinates.y}
          onChange={handleChange}
        />
      </label>
      <label>
        Cardinal direction:
        <select
          data-testid="cardinalDirection"
          name="cardinalDirection"
          value={cardinalDirection}
          onChange={handleChange}
        >
          <option value="N">N</option>
          <option value="E">E</option>
          <option value="S">S</option>
          <option value="W">W</option>
        </select>
      </label>
    </div>
  );
}
