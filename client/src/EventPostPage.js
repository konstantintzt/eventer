import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Paper, Card, CardContent, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Background from './components/Background';
import Login from './Login';
import { invalidToken } from './utils';

const EventPostPage = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    zip: '',
    type: 1
  });

  const [submitted, setSubmitted] = useState(false);

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
    console.log(JSON.stringify({ event: eventData }));
    console.log(localStorage.getItem("token"));
    const response = await fetch('http://localhost:2902/event/new', {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    });

    const data = await response.json();
    if (response.ok) {
      setSubmitted(true);
    } else {
      console.error('Failed to post event', data);
    }
  };

  if (invalidToken()) return <Login redirect="/event-post" />

  else return (
    <Background>
      <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: '125px' }}>
        <Typography variant="h3" gutterBottom>
          Post a New Event
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Share your events with your UCLA community and attract more attendees. Fill out the form below to get started.
        </Typography>

        <Card sx={{ minWidth: 275, maxWidth: 500, mt: 3 }}>
          <CardContent>
            {submitted ? (
              <Typography variant="h6" style={{ color: 'green' }}>
                Successfully posted event!
              </Typography>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </Box>
    </Background>
  );
};

export default EventPostPage;
