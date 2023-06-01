import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import katerina_stepanenko from './images/katerina_stepanenko.jpg';
import { Card, CardContent, Typography } from '@material-ui/core';

import Background from './components/Background';

// const styles = {
//     paperContainer: {
//         backgroundImage: `url(${katerina_stepanenko})`,
//         backgroundRepeat: 'repeat',
//         backgroundSize: '300px',
//         width: '100%',
//         height: '100vh',
//     },
//     gridContainer: {
//         backgroundColor: alpha('#FFFFFF', 0.7),
//         width: '80%',
//         height: '100vh',
//         margin: 'auto',
//         borderRadius: '0px',
//     },
//     darkenBackground: {
//         width: '100%',
//         height: '100vh',
//         backgroundColor: alpha('#000000', 0),
//     },
// };

const events = [
    {
        id: 1,
        url:
            'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        title: 'This is a cat.',
        desc: 'This is a description of a cat.',
        date: 1634567890,
        organizer: 'John Doe',
        zip: '12345',
        uuid: '01234567-89ab-cdef-0123-456789abcdef',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 1,
    },
    {
        id: 2,
        title: 'This card has no image.',
        desc: 'How sad...',
        date: 1634567890,
        organizer: 'Jane Smith',
        zip: '54321',
        uuid: '89abcdef-0123-4567-89ab-cdef01234567',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 2,
    },
];

function getEventType(type) {
    switch (type) {
        case 1:
            return 'Concert';
        case 2:
            return 'Play';
        case 3:
            return 'Movie Screening';
        case 4:
            return 'Sports Game';
        case 5:
            return 'Party';
        default:
            return 'Unknown';
    }
}

export const getAllEvents = async () => {
    try {
        const response = await fetch('http://localhost:2902/events');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching events: ", error);
        throw error;
    }
};



function EventPage() {
    const [event, setEvent] = useState(null);
    // const { id } = useParams();
    const params  = useParams();
    const id = params.id;

    const addAttendance = async() => {
        const response = await fetch('http://localhost:2902/attend', {
          method: 'POST',
          body: JSON.stringify({ uuid: id}),
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
        });
      
        const data = await response.json();
        if (response.ok) {
          // setSubmitted(true);
        } else {
          console.error('Failed to post event', data);
        }
      };

    useEffect(() => {
        const getEvent = async () => {
            try {
                console.log(id);
                const response = await fetch(`http://localhost:2902/event/${id}`);
                const data = await response.json();
                console.log(data);
                setEvent(data.event); // Access the event object inside the data
            } catch (error) {
                console.error("Error fetching event: ", error);
            }
        };

        getEvent();
    }, [id]);

    return (

        // Note to charles -- pass prop "opaque" to background if you want it to be opaque
        // don't if you want it to be semitransparent
        // <Background opaque> 
        //     {event && (
        //         <EventCard
        //             id={event.id}
        //             url={event.url}
        //             title={event.title}
        //             desc={event.desc}
        //         />
        //     )}
        // </Background>

        <Background opaque>
            <Grid container justifyContent="center" alignItems="center" height="100%">
                {event && (
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <div style={{ backgroundImage: `url(${event.url})` }}></div>
                                <Typography variant="h4" component="div">{event.title}</Typography>
                                <Typography variant="body1">Date: {new Date(event.date * 1000).toLocaleDateString()}</Typography>
                                <Typography variant="body1">Organizer: {event.organizer}</Typography>
                                <Typography variant="body1">ZIP: {event.zip}</Typography>
                                <Typography variant="body1">Type: {getEventType(event.type)}</Typography>
                                <Typography variant="body1">Description: {event.description}</Typography>
                                <button type="button" onClick={addAttendance}>Attend</button>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Background>
    );
}

export const eventz = events;
export default EventPage;