import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha, makeStyles } from '@material-ui/core/styles';
import katerina_stepanenko from './images/katerina_stepanenko.jpg';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '2rem',
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EventPostPage = () => {
  const classes = useStyles();

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    zip: '',
    type: 1,
    organizer: 'charles',
  });

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
    const response = await fetch('http://tzantchev.com:2512/event/new', {
      method: 'POST',
      body: JSON.stringify({ event: eventData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.json());
    console.log(response.json());
  };

  return (
    <div>
      <Paper
        style={{
          backgroundImage: `url(${katerina_stepanenko})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px',
          width: '100%',
          height: '100vh',
        }}
      >
        <Paper
          style={{
            width: '80%',
            height: '100vh',
            margin: 'auto',
            borderRadius: '0px',
            backgroundColor: alpha('#FFFFFF', 0.7),
          }}
          position="fixed"
          elevation={0}
        >
          <Grid container justifyContent="center" alignItems="top" height="100%">
            <Grid item xs={12} md={6}>
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '400px',
                  margin: '0 auto',
                  marginTop: '4rem',
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
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </div>
  );
};

export default EventPostPage;
