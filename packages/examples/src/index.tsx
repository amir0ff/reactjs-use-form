import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/theme-provider';
import { ChangePassword } from './ChangePassword';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ChangePassword />
  </ThemeProvider>,
);
