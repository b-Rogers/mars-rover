import React from 'react';
import { App } from '.';
import { render, fireEvent } from '@testing-library/react';

function setupInput(inputID: string): HTMLInputElement {
  const { queryAllByTestId } = render(<App />);
  return queryAllByTestId(inputID)[0] as HTMLInputElement;
}

test('grid renders', function () {
  const { getByTestId } = render(<App />);
  expect(getByTestId('grid')).toBeInTheDocument();
});

test('labels render', function () {
  const { getByTestId } = render(<App />);
  expect(getByTestId('labels')).toBeInTheDocument();
});

test('gridSizeX input to update with data when valid', function () {
  const input = setupInput('gridSizeX');

  fireEvent.change(input, { target: { value: 7 } });
  expect(input.value).toBe('7');
});

test('gridSizeY input to update with data when valid', function () {
  const input = setupInput('gridSizeY');

  fireEvent.change(input, { target: { value: 3 } });
  expect(input.value).toBe('3');
});

test('coordinatesX input to update with data when valid', function () {
  const input = setupInput('coordinatesX');

  fireEvent.change(input, { target: { value: 4 } });
  expect(input.value).toBe('4');
});

test('coordinatesY input to update with data when valid', function () {
  const input = setupInput('coordinatesY');

  fireEvent.change(input, { target: { value: 2 } });
  expect(input.value).toBe('2');
});

test('cardinalDirection input to update with data', function () {
  const input = setupInput('cardinalDirection');

  fireEvent.change(input, { target: { value: 'N' } });
  expect(input.value).toBe('N');
});

test('Cardinal direction updating with valid keypress', function () {
  const input = setupInput('cardinalDirection');

  fireEvent.change(input, { target: { value: 'N' } });

  fireEvent.keyPress(window, { code: 'KeyR' });
  expect(input.value).toBe('E');

  fireEvent.keyPress(window, { code: 'KeyR' });
  expect(input.value).toBe('S');

  fireEvent.keyPress(window, { code: 'KeyR' });
  expect(input.value).toBe('W');
});

test('Cardinal direction not updating with invalid keypress', function () {
  const input = setupInput('cardinalDirection');

  fireEvent.change(input, { target: { value: 'N' } });
  fireEvent.keyPress(window, { code: 'KeyJ' });

  expect(input.value).toBe('N');
});

test('Coordinates direction not updating with invalid keypress', function () {
  const cardinalDirectionInput = setupInput('cardinalDirection');
  const coordinatesYInput = setupInput('coordinatesY');

  fireEvent.change(cardinalDirectionInput, {
    target: { value: 'N' },
  });
  fireEvent.change(coordinatesYInput, { target: { value: 0 } });
  fireEvent.keyPress(window, { code: 'KeyJ' });

  expect(coordinatesYInput.value).toBe('0');
});

test('Test scenario input', function () {
  // Set the scenario
  fireEvent.change(setupInput('gridSizeX'), { target: { value: 5 } });
  expect(setupInput('gridSizeX').value).toBe('5');

  fireEvent.change(setupInput('gridSizeY'), { target: { value: 5 } });
  expect(setupInput('gridSizeY').value).toBe('5');

  fireEvent.change(setupInput('coordinatesX'), { target: { value: 1 } });
  expect(setupInput('coordinatesX').value).toBe('1');

  fireEvent.change(setupInput('coordinatesY'), { target: { value: 2 } });
  expect(setupInput('coordinatesY').value).toBe('2');

  fireEvent.change(setupInput('cardinalDirection'), {
    target: { value: 'N' },
  });
  expect(setupInput('cardinalDirection').value).toBe('N');

  // Test user input
  fireEvent.keyPress(window, { code: 'KeyL' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyL' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyL' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyL' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyM' });

  expect(setupInput('coordinatesX').value).toBe('1');
  expect(setupInput('coordinatesY').value).toBe('3');
  expect(setupInput('cardinalDirection').value).toBe('N');

  // Set second scenario
  fireEvent.change(setupInput('coordinatesX'), { target: { value: 3 } });
  expect(setupInput('coordinatesX').value).toBe('3');
  fireEvent.change(setupInput('coordinatesY'), { target: { value: 3 } });
  expect(setupInput('coordinatesY').value).toBe('3');
  fireEvent.change(setupInput('cardinalDirection'), {
    target: { value: 'E' },
  });
  expect(setupInput('cardinalDirection').value).toBe('E');

  // Test user input
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyR' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyR' });
  fireEvent.keyPress(window, { code: 'KeyM' });
  fireEvent.keyPress(window, { code: 'KeyR' });
  fireEvent.keyPress(window, { code: 'KeyR' });
  fireEvent.keyPress(window, { code: 'KeyM' });

  expect(setupInput('coordinatesX').value).toBe('5');
  expect(setupInput('coordinatesY').value).toBe('1');
  expect(setupInput('cardinalDirection').value).toBe('E');
});
