import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from './images/katerina_stepanenko.jpg';

const styles = {
  paperContainer: {
    backgroundImage: `url(${katerina_stepanenko})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '300px',
    width: '100%',
    height: '100vh',
  },
  gridContainer: {
    backgroundColor: alpha('#FFFFFF', 0.7),
    width: '80%',
    height: '100vh',
    margin: 'auto',
    borderRadius: '0px',
  },
  darkenBackground: {
    width: '100%',
    height: '100vh',
    backgroundColor: alpha('#000000', 0),
  },
};

const EventPostPage = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    zip: '',
    type: 1,
  });

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic like send data to backend or store in a database
    console.log(eventData);
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
                <TextField
                  style={{ marginBottom: '2rem' }}
                  label="Event Type"
                  type="number"
                  name="type"
                  value={eventData.type}
                  onChange={handleInputChange}
                  required
                  inputProps={{
                    min: 1,
                    max: 5,
                  }}
                />
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
