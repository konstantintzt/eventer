import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from '../images/katerina_stepanenko.jpg';
import Paper from '@material-ui/core/Paper';
import Background from '../components/Background';


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

function EventGrid() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await fetch('http://tzantchev.com:2512/events');
                const data = await response.json();
                setEvents(data);
                console.log("Events: ", data);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        };

        getAllEvents();
    }, []);

    const handleEventClick = (id) => {
        navigate(`/event/${id}`);
    };

    return (
        <Paper container style={styles.paperContainer}>
            <Paper container style={styles.darkenBackground}>
                <Paper container style={styles.gridContainer} position="fixed" elevation={0}>
                    <Grid container rowSpacing={1} sx={{ px: '40px', py: '30px' }} margin="auto">
                        {events.map((event) => (
                            <Grid item key={event.id}>
                                <EventCard
                                    id={event.id}
                                    title={event.title}
                                    desc={event.desc}
                                    likes={event.likes}
                                    onClick={() => handleEventClick(event.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Paper>
        </Paper>
    );
}

export default EventGrid;
