import React from 'react';
import { useParams } from 'react-router-dom';
import EventCard from './components/EventCard';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Background from './components/Background';

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
        // Note to charles -- pass prop "opaque" to background if you want it to be opaque
        // don't if you want it to be semitransparent
        <Background opaque> 
            {event && (
                <EventCard
                    id={event.id}
                    url={event.url}
                    title={event.title}
                    desc={event.desc}
                />
            )}
        </Background>
    );
}



export default EventPage;
