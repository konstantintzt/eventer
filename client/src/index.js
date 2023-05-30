import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Themes';
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './EventPostPage.js';
import { getAllEvents } from './EventsPage';
import reportWebVitals from './reportWebVitals';
import EventPage from './EventsPage'


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event-post" element={<EventPostPage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
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
        // Handle the error here
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


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
