import * as React from 'react';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Header from './Header'; // Import the Header component

import bagus_prakoso from '../images/bagus_prakoso.jpg';
import katerina_stepanenko from '../images/katerina_stepanenko.jpg';

const styles = {
    paperContainer: {
        backgroundImage: `url(${katerina_stepanenko})`,
        backgroundRepeat: "repeat",
        backgroundSize: '300px',
        width: '100%',
        height: '100vh'
    },
    gridContainer: {
        backgroundColor: alpha('#FFFFFF', 0.7),
        width: '80%',
        height: '100vh',
        margin: 'auto',
        borderRadius: '0px'
    },
    darkenBackground: {
        width: '100%',
        height: '100vh',
        backgroundColor: alpha('#000000', 0)
    }
};

function EventGrid() {
    return (

        <Paper container style={styles.paperContainer}>
            <Paper container style={styles.darkenBackground}>
                <Paper container style={styles.gridContainer} position='fixed' elevation={0}>
                    <Grid container rowSpacing={1} sx={{ px: '40px', py: '30px' }} margin='auto'>
                        <Grid item>
                            <EventCard
                                url='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
                                title='This is a cat.'
                                desc='This is a description of a cat.'
                            />
                        </Grid>
                        <Grid item>
                            <EventCard
                                title='This card has no image.'
                                desc='How sad...'
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Paper>
        </Paper>
    );
}

export default EventGrid;  