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
import { Test } from './components/test.js';

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

  const handleSearchClick = async (query, before, after, zipCode, type) => {

      var before_str = ""
      var after_str = ""
      var search_str = ""
      var zipcode_str = ""
      var type_str = ""
      if (query.length != 0){
        search_str = `search=${query}`
      }
      if (before != null){
        var temp = new Date(before) 
        before_str = `&before=${Math.floor(temp.getTime())}`
      }
      if (after != null){
        var temp = new Date(after) 
        after_str = `&after=${Math.floor(temp.getTime())}`
      }
      if (zipCode != null && zipCode.length != 0){
        zipcode_str = `&zip=${zipCode}`
      }
      if (type != null && type.length != 0){
        type_str=`&type=${type}`
      }


      const rawData = await fetch(`http://localhost:2902/events?`+search_str+before_str+after_str+zipcode_str+type_str,
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

    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
          const resizeObserverErrDiv = document.getElementById(
              'webpack-dev-server-client-overlay-div'
          );
          const resizeObserverErr = document.getElementById(
              'webpack-dev-server-client-overlay'
          );
          if (resizeObserverErr) {
              resizeObserverErr.setAttribute('style', 'display: none');
          }
          if (resizeObserverErrDiv) {
              resizeObserverErrDiv.setAttribute('style', 'display: none');
          }
      }
    });
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