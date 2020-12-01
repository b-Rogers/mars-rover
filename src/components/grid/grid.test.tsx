import { render } from '@testing-library/react';

import Grid from '.';

const props = {
  gridSizeX: 10,
  gridSizeY: 10,
  coordinatesX: 0,
  coordinatesY: 0,
};

test('grid renders', function () {
  const { getByTestId } = render(
    <Grid
      gridSizeX={props.gridSizeX}
      gridSizeY={props.gridSizeY}
      coordinatesX={props.coordinatesX}
      coordinatesY={props.coordinatesY}
    />
  );
  expect(getByTestId('grid')).toBeInTheDocument();
});
