import { ThemeProvider, createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3f51b5',
        accent: '#f50057'
      },
      secondary: {
        main: '#f50057',
      },
      text: {
        black: '#000000',
        white: '#ffffff',
      },
      red: '#f50057',
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
