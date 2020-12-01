import { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './components/app';

import './styles/base.scss';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
