import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import Background from '../components/Background';

function EventGrid({ events }) {

    const navigate = useNavigate();

    const handleEventClick = (id) => {
        navigate(`/event/${id}`);
    };

    return (
        <Background>
            <Grid container rowSpacing={1} sx={{ px: '40px', py: '30px' }} margin="auto">
                {events.map((event) => (
                    <Grid item key={event.uuid}>
                        <EventCard
                            id={event.uuid}
                            title={event.title}
                            desc={event.desc}
                            likes={event.likes}
                            onClick={() => handleEventClick(event.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Background>
    );
}



export default EventGrid;
