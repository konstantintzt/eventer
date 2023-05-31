import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './EventPostPage.js';
import EventPage from './EventsPage';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { theme } from './Themes';
import { getAllEvents } from './EventsPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event-post" element={<EventPostPage />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
        </div>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]);
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

const Root = () => {
  return (
    <React.StrictMode>
          <GoogleOAuthProvider clientId="588092924792-o3h09qv5dc5jrm4l80tgdjp62kr9e60g">
      <Router>

      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </Router>
    </GoogleOAuthProvider>

    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
