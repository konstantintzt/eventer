import React from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './components/EventCard';
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

const events = [
    {
        id: 1,
        url:
            'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        title: 'This is a cat.',
        desc: 'This is a description of a cat.',
    },
    {
        id: 2,
        title: 'This card has no image.',
        desc: 'How sad...',
    },
];

function EventPage() {
    const { id } = useParams();
    const event = events.find((event) => event.id === Number(id));

    return (
        <div style={styles.paperContainer}>
            <div style={styles.darkenBackground}>
                <div style={styles.gridContainer}>
                    {event && (
                        <EventCard
                            id={event.id}
                            url={event.url}
                            title={event.title}
                            desc={event.desc}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}



export default EventPage;
