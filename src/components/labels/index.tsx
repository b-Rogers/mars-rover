import './labels.scss';

interface Ilabels {
  gridSizeX: number;
  gridSizeY: number;
  coordinatesX: number;
  coordinatesY: number;
  cardinalDirection: string | number;
  handleChange: any;
}

export default function Labels(props: Ilabels) {
  return (
    <div data-testid="labels" className="label-wrapper">
      <label>
        Grid size X:
        <input
          data-testid="gridSizeX"
          type="number"
          name="gridSizeX"
          value={props.gridSizeX}
          onChange={props.handleChange}
        />
      </label>
      <label>
        Grid size Y:
        <input
          data-testid="gridSizeY"
          type="number"
          name="gridSizeY"
          value={props.gridSizeY}
          onChange={props.handleChange}
        />
      </label>
      <label>
        Coordinates X:
        <input
          data-testid="coordinatesX"
          type="number"
          name="coordinatesX"
          value={props.coordinatesX}
          onChange={props.handleChange}
        />
      </label>
      <label>
        Coordinates Y:
        <input
          data-testid="coordinatesY"
          type="number"
          name="coordinatesY"
          value={props.coordinatesY}
          onChange={props.handleChange}
        />
      </label>
      <label>
        Cardinal direction:
        <select
          data-testid="cardinalDirection"
          name="cardinalDirection"
          value={props.cardinalDirection}
          onChange={props.handleChange}
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
