import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import Header from './sections/Header';
import EventGrid from './sections/EventGrid';
import EventPostPage from './EventPostPage.js';
import EventPage from './EventsPage'
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { theme } from './Themes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { invalidToken } from './utils';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="588092924792-o3h09qv5dc5jrm4l80tgdjp62kr9e60g">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-post" element={<EventPostPage />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

const Home = () => {

  const [events, setEvents] = useState([])

  const handleSearchClick = async query => {
    const rawData = await fetch(`http://localhost:2902/events?search=${query}`,
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    const data = await rawData.json()
    setEvents([])
    setEvents(data)
  }

  useEffect(() => {
    async function fetchData() {

      if (invalidToken()) return;

      try {
        const rawData = await fetch(`http://localhost:2902/events`,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        const data = await rawData.json()
        setEvents(data)
        console.log(events)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  if (invalidToken()) return <Login redirect="/" />

  return (
    <div>
      <Header handleSearchSubmit={handleSearchClick}/>
      <EventGrid events={events}/>
    </div>
  )
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