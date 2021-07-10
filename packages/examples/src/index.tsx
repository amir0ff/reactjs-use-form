import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import { ChangePassword } from './ChangePassword';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ChangePassword />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
