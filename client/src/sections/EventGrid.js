import * as React from 'react';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function EventGrid() {
    return (
        <Box sx={{ width: '100%'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={2}>
                    <EventCard
                    url='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
                    title='This is a cat.'
                    desc='This is a description of a cat.'
                        />
                </Grid>
                <Grid item xs={2}>
                    <EventCard
                    title='This card has no image.'
                    desc='How sad...'
                        />
                </Grid>
            </Grid>
        </Box>
    );
  }
  
  export default EventGrid;  