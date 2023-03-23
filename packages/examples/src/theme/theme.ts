import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#424242',
      default: '#303030',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    primary: {
      main: purple[300],
    },
    secondary: {
      main: purple[400],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
