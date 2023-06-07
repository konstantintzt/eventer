import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress';
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
  const [loading, setLoading] = useState(true)

  const handleRecommend = async () => {
    setLoading(true)
    if (invalidToken()) return;

    try {
      const rawData = await fetch(`http://localhost:2902/recommend`,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      const data = await rawData.json()
      setEvents(data)
      setLoading(false)
      console.log(events)
      localStorage.setItem("homeState", "recommend")
    }
    catch (err) {
      console.error(err)
    }
  }

  const handleSearchClick = async (query, before, after, zipCode, type) => {

    var searchQuery = new URLSearchParams()
    if (query != null && query !== "") searchQuery.append("search",query)
    if (before != null) searchQuery.append("before", Math.floor(new Date(before).getTime() / 1000))
    if (after != null) searchQuery.append("after", Math.floor(new Date(after).getTime() / 1000))
    if (zipCode != null) searchQuery.append("zipcode", zipCode)
    if (type != null) searchQuery.append("type", type.value)

      const rawData = await fetch(`http://localhost:2902/events?${searchQuery.toString()}`,
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      const data = await rawData.json()
      setEvents([])
      setEvents(data)
      setLoading(false)
      localStorage.setItem("homeState", "search")
      localStorage.setItem("currentQuery", searchQuery.toString())

  }


  
  useEffect(() => {
    async function fetchData() {

      if (invalidToken()) return;

      try {
        var fetchUrl = "events"
        if (localStorage.getItem("homeState") === "recommend") {
          fetchUrl = "recommend"
          localStorage.setItem("homeState", "recommend")
        }
        else if (localStorage.getItem("homeState") === "search" || localStorage.getItem("homeState") === null) {
          if (localStorage.getItem("currentQuery") !== null) fetchUrl = "events?" + localStorage.getItem("currentQuery")
          else {
            var searchQuery = new URLSearchParams()
            searchQuery.append("after", Math.floor(Date.now() / 1000))
            fetchUrl = "events?" + searchQuery.toString()
            localStorage.setItem("currentQuery", searchQuery.toString())
          }
        }
        console.log(fetchUrl)
        const rawData = await fetch(`http://localhost:2902/${fetchUrl}`,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
        const data = await rawData.json()
        setEvents(data)
        setLoading(false)
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

  if (loading) return (
    <div>
      <Header handleSearchSubmit={handleSearchClick} handleRecommend={handleRecommend}/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress style={{ display: "flex", justifyContent: "center", alignItems: "center" }}/>
      </div>
    </div>
  )
  return (
    <div>
      <Header handleSearchSubmit={handleSearchClick} handleRecommend={handleRecommend}/>
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