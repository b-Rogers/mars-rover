import { IState } from '../app/app-reducer';
import './grid.scss';

interface IGridProps {
  gridSize: IState['gridSize'];
  coordinates: IState['coordinates'];
}

export default function Grid({ gridSize, coordinates }: IGridProps) {
  const grid = Array(gridSize.x + 1)
    .fill(null)
    .map((_, colId) => {
      const rows = Array(gridSize.y + 1)
        .fill(null)
        .map((_, rowId, rowArray) => {
          const rowPosition = rowArray.length - 1 - rowId;
          return (
            <div
              data-row={rowPosition}
              key={rowPosition}
              className={'grid__row'}
            >
              {coordinates.x === colId && coordinates.y === rowPosition && (
                <div className={'grid__rover'} />
              )}
            </div>
          );
        });

      return (
        <div data-col={colId} key={colId} className={'grid__col'}>
          {rows}
        </div>
      );
    });

  return (
    <div data-testid="grid" className="grid-wrapper">
      <div className="grid">{grid}</div>
    </div>
  );
}
