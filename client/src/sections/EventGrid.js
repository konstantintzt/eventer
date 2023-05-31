import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from '../images/katerina_stepanenko.jpg';
import Paper from '@material-ui/core/Paper';
import Background from '../components/Background';

function EventGrid() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        console.log("EventTesting: ", events);
    }, [events]);

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await fetch('http://tzantchev.com:2512/events');
                const data = await response.json();
                setEvents(data);
                console.log("Events: ", events);
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
