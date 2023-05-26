import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './EventPostPage.js';
import reportWebVitals from './reportWebVitals';
import { theme } from './Themes';

import { Typography } from '@mui/material';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Typography variant='h1'>yeh</Typography>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-post" element={<EventPostPage />} />
          {/* Insert other routes here */}
        </Routes>
     </ThemeProvider>
    </Router>
  );
};

const Home = () => {
  return (
      <EventGrid />
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);

reportWebVitals();
