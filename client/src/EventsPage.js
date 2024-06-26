import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { CardMedia, Typography, Table, TableCell, TableRow, TableBody } from '@mui/material';
import Login from "./Login"
import { styled } from '@mui/system';

import Background from './components/Background';
import AttendingList from './components/AttendingList'
import { invalidToken, API_URL } from './utils';
import EventPageHeader from './EventPageHeader';

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    width: '20%',
    variant: 'h7',
    '&:hover': {},
}));

function HeaderCell({ text }) {
    return (
        <StyledHeaderCell>
            <Typography variant='h7' sx={{ textTransform: 'lowercase' }}>
                <strong>{text}</strong>
            </Typography>
        </StyledHeaderCell>
    );
}

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
        const response = await fetch(API_URL+"events");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching events: ', error);
        throw error;
    }
};

function EventPage() {
    const [event, setEvent] = useState(null);
    const [attendees, setAttendees] = useState(null);
    // const { id } = useParams();
    const params = useParams();
    const id = params.id;

    const addAttendance = async () => {
        const response = await fetch(API_URL+"attend", {
            method: 'POST',
            body: JSON.stringify({ uuid: id }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        const data = await response.json();
        if (response.ok) {
            // setSubmitted(true);
        } else {
            console.error('Failed to post event', data);
        }
        window.location.reload();
    };

    useEffect(() => {
        const getEvent = async () => {
            if (invalidToken()) return;

            try {
                console.log(id);
                const response = await fetch(`${API_URL}event/${id}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
                });
                const data = await response.json();
                // const userAttending = await database.getDB().collection("attendances").countDocuments({...value, user: req.user.uuid});
                console.log(data);
                setAttendees(data.attendees);
                setEvent(data.event);
                console.log(data.event.title);
            } catch (error) {
                console.error('Error fetching event: ', error);
            }
        };

        getEvent();
    }, [id]);

    if (invalidToken()) return <Login redirect="/event-post" />;

    return (
        <>
            <EventPageHeader />
            <Background opaque nospacing>
                <Grid container justifyContent="left" alignItems="center" height="100%">
                    {event && (
                        <Grid container>
                            <CardMedia
                                margin="0px"
                                component="img"
                                height="400px"
                                width="100%"
                                src={event.banner != null ? event.banner : "https://images.unsplash.com/photo-1549388604-817d15aa0110"}
                            // src={event.url}
                            />
                            <Grid container sx={{ px: '40px', py: '30px' }} margin="auto" xs={10}>
                                <Grid item xs={12} paddingBottom="30px">
                                    <Typography variant="h3" align="center" component="div">
                                        {event.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Table margin="auto">
                                        <TableBody>
                                            <TableRow>
                                                <HeaderCell text="Date" />
                                                <TableCell>{new Date(event.date).toLocaleDateString(undefined, { timeZone: "UTC"})}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell text="Organizer" />
                                                <TableCell>{event.organizer}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell text="Location" />
                                                <TableCell>{event.location}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell text="Zip Code" />
                                                <TableCell>{event.zip}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell text="Organizer" />
                                                <TableCell>{getEventType(event.type)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <HeaderCell text="Description" />
                                                <TableCell>{event.description}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                {attendees && (
                                    <Grid item xs={4}>
                                        <AttendingList attendees={attendees} clickfunc={addAttendance} isAttending={true}/>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Background>
        </>
    );
}

export default EventPage;
