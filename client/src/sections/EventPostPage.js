import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Header from './Header'; // Import the Header component

import katerina_stepanenko from '../images/katerina_stepanenko.jpg';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
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
}));

const EventPostPage = () => {
  const classes = useStyles();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic, e.g., send data to backend or store in a database
    console.log(eventData);
  };

  return (
    <Paper container className={classes.paperContainer}>
      <Paper container className={classes.darkenBackground}>
        <Paper container className={classes.gridContainer} position="fixed" elevation={0}>
          <Grid container justifyContent="center" alignItems="top" height="100%">
            <Grid item xs={12} md={6}>
              <form className={classes.formContainer} onSubmit={handleSubmit}>
                <TextField
                  className={classes.formField}
                  label="Event Title"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  className={classes.formField}
                  label="Event Description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                />
                <TextField
                  className={classes.formField}
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
                  className={classes.formField}
                  label="Event Time"
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 minutes
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
    </Paper>
  );
};

export default EventPostPage;
