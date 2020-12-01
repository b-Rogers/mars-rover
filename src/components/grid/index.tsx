import './grid.scss';

interface IGridProps {
  gridSizeX: number;
  gridSizeY: number;
  coordinatesX: number;
  coordinatesY: number;
}

export default function Grid(props: IGridProps) {
  const grid = Array(props.gridSizeX + 1)
    .fill(null)
    .map((_, colId) => {
      const rows = Array(props.gridSizeY + 1)
        .fill(null)
        .map((_, rowId, rowArray) => {
          const rowPosition = rowArray.length - 1 - rowId;
          return (
            <div
              data-row={rowPosition}
              key={rowPosition}
              className={'grid__row'}
            >
              {props.coordinatesX === colId &&
                props.coordinatesY === rowPosition && (
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
