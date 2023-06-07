import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material';
import Background from './components/Background';
import Login from './Login';
import { invalidToken } from './utils';
import { Link, useNavigate } from 'react-router-dom';

import EventPageHeader from './EventPageHeader';

const EventPostPage = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    zip: '',
    type: 1,
    banner: '' // Added the "banner" field
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'type') {
      value = parseInt(value);
    }

    setEventData({
      ...eventData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewEvent(eventData);
  };

  const addNewEvent = async (eventData) => {
    eventData.date = Math.floor(new Date(eventData.date).valueOf());
    const response = await fetch('http://localhost:2902/event/new', {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    });

    const data = await response.json();
    if (response.ok) {
      setSubmitted(true);
    } else {
      console.error('Failed to post event', data);
    }
  };

  if (invalidToken()) return <Login redirect="/event-post" />;

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <EventPageHeader />
      <Background>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: '10px' }}>
          {submitted ? (
            <Box sx={{ paddingLeft: '30px' }}>
              <Typography variant="h3" style={{ color: 'green' }}>
                Successfully posted event!
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 2, marginLeft: '230px' }}>
                Take Me Home
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h3" gutterBottom>
                Post a New Event
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Share your events with your UCLA community and attract more attendees. Fill out the form below to get started.
              </Typography>

              <Card sx={{ minWidth: 275, maxWidth: 500, mt: 3 }}>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Event Title"
                      name="title"
                      value={eventData.title}
                      onChange={handleInputChange}
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Event Description"
                      name="description"
                      value={eventData.description}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={4}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Event Date"
                      type="date"
                      name="date"
                      value={eventData.date}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Event ZIP"
                      name="zip"
                      value={eventData.zip}
                      onChange={handleInputChange}
                      required
                      inputProps={{
                        pattern: '\\d{5}',
                      }}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Banner URL"
                      name="banner"
                      value={eventData.banner}
                      onChange={handleInputChange}
                      required
                      sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel></InputLabel>
                      <Select
                        name="type"
                        value={eventData.type}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={1}>Concert</MenuItem>
                        <MenuItem value={2}>Play</MenuItem>
                        <MenuItem value={3}>Movie Screening</MenuItem>
                        <MenuItem value={4}>Sports Game</MenuItem>
                        <MenuItem value={5}>Party</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                      Post Event
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </Background>
    </Box>
  );
};

export default EventPostPage;
