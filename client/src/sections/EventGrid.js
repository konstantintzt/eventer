import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from '../images/katerina_stepanenko.jpg';

import Background from '../components/Background';

function EventGrid() {
    const navigate = useNavigate();

    const handleEventClick = (id) => {
        navigate(`/event/${id}`);
    };

    return (
        <Background>
            <Grid item>
                <EventCard
                        id={1}
                        url="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
                        title="This is a cat."
                        desc="This is a description of a cat."
                        onClick={() => handleEventClick(1)}
                    />
            </Grid>
            <Grid item>
                <EventCard
                        id={2}
                        title="This card has no image."
                        desc="How sad..."
                        onClick={() => handleEventClick(2)}
                    />
            </Grid>
        </Background>
    );
}

export default EventGrid;
