import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import DINAlternateBold from './fonts/DINAlternate-Bold.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from './Routes'
import useMediaQuery from '@mui/material/useMediaQuery';

const dinAlternateBold = {
  fontFamily: 'DINAlternateBold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('DINAlternate'),
    local('DINAlternate-Bold'),
    url(${DINAlternateBold}) format('truetype')
  `,
};

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'dinAlternateBold',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        '@global': {
          '@font-face': [dinAlternateBold],
      },
      `
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

{/* <BrowserRouter basename={process.env.PUBLIC_URL} /> */ }

root.render(
  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Box>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
