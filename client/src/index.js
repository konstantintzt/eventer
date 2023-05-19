import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './sections/Header'
import EventGrid from './sections/EventGrid.js';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './Themes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Header />
      <EventGrid />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
