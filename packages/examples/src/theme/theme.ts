import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export const theme = createTheme({
  palette: {
    type: 'light',
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
