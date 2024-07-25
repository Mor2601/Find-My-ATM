import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // Apply global styles here
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          height: 100%;
          margin: 2px;
          overflow: hidden;
          box-sizing: border-box;
        }
        #root {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
      `,
    },
  },
});

export default theme;
