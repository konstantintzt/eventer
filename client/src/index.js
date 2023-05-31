import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './EventPostPage.js';
import EventPage from './EventsPage'
import reportWebVitals from './reportWebVitals';
import { theme } from './Themes';

import { getAllEvents } from './EventsPage';

const App = () => {
  return (
    <Router>
      {/* <ThemeProvider theme={theme}> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-post" element={<EventPostPage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
      {/* </ThemeProvider>  */}
    </Router>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]); // Initialize state to hold events data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <EventGrid events={events} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
