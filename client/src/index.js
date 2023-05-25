import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Themes';
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './sections/EventPostPage.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <React.StrictMode>
        <Header />
        <Routes>
          <Route path='/' element={<EventGrid />} />
          <Route path='/event-post' element={<EventPostPage />} />
          {/* insert here other routes in the future*/}
        </Routes>
      </React.StrictMode>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
