import React from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { ChangePassword } from './ChangePassword';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ChangePassword />
    </ThemeProvider>
  </StyledEngineProvider>,
);
