import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Themes';
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './EventPostPage.js';
import reportWebVitals from './reportWebVitals';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-post" element={<EventPostPage />} />
          {/* Insert other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const Home = () => {
  return (
    <div>
      <EventGrid />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();
