import { ThemeProvider, createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    colors: {
      main: '#3f51b5',
      red: '#d0312d',
      white: '#ffffff'
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Montserrat',
    },
    h3: {
      fontFamily: 'Montserrat',
    },
    h4: {
      fontFamily: 'Montserrat',
    },
    h5: {
      fontFamily: 'Montserrat',
    },
    h6: {
      fontFamily: 'Montserrat',
    },
    subtitle1: {
      fontFamily: 'Hind',
    },
    subtitle2: {
      fontFamily: 'Hind',
    },
    body1: {
      fontFamily: 'Hind',
    },
    body2: {
      fontFamily: 'Hind',
    },
    button: {
      fontFamily: 'Hind',
    },
    caption: {
      fontFamily: 'Hind',
    },
    overline: {
      fontFamily: 'Hind',
    },
  },
});