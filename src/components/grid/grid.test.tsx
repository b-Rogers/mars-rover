import { render } from '@testing-library/react';

import Grid from '.';

const props = {
  gridSize: {
    x: 10,
    y: 10,
  },
  coordinates: {
    x: 0,
    y: 0,
  },
};

test('grid renders', function () {
  const { getByTestId } = render(<Grid {...props} />);
  expect(getByTestId('grid')).toBeInTheDocument();
});
