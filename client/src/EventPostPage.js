import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Paper } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Background from './components/Background';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '2rem',
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const EventPostPage = () => {
  const classes = useStyles();

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

  if (!localStorage.getItem("token")) return <Login redirect="/event-post"/>

  else return (
    <Background>
      <Grid container justifyContent="center" spacing={2} style={{ height: '90vh', textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            Post a New Event
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Share your events with your UCLA community and attract more attendees. Fill out the form below to get started.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            {submitted ? (
              <Typography variant="h6" style={{ color: 'green' }}>
                Successfully posted event!
              </Typography>
            ) : (
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
                onSubmit={handleSubmit}
              >

                <TextField
                  style={{ marginBottom: '2rem' }}
                  label="Event Title"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  style={{ marginBottom: '2rem' }}
                  label="Event Description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                />
                <TextField
                  style={{ marginBottom: '2rem' }}
                  label="Event Date"
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{ marginBottom: '2rem' }}
                  label="Event ZIP"
                  name="zip"
                  value={eventData.zip}
                  onChange={handleInputChange}
                  required
                  inputProps={{
                    pattern: '\\d{5}',
                  }}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="type"
                    value={eventData.type}
                    onChange={handleInputChange}
                    required
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
          </Paper>
        </Grid>
      </Grid>
    </Background>
  );
};

export default EventPostPage;
