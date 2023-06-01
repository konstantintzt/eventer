import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import Background from '../components/Background';
import LikeButton from '../components/LikeButton';
import Card from '@mui/material/Card';
import { styled } from '@mui/system';

function EventGrid({ events }) {

    const StyledCard = styled(Card)((theme) => ({
        transition: 'transform 0.15s ease-in-out',
        '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
      }));
      

    const navigate = useNavigate();

    const handleEventClick = (id) => {
        navigate(`/event/${id}`);
    };

    const addLike = async(id) => {
        console.log("clicked")
        const response = await fetch('http://localhost:2902/like', {
          method: 'POST',
          body: JSON.stringify({ uuid: id, like : 1}),
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
        window.location.reload();
      };
    

    console.log("generating " + events)
    return (
        <Background>
            <Grid container rowSpacing={1} sx={{ px: '40px', py: '30px' }} margin="auto">
                {(events.length > 0) && events.map((event) => (
                    <Grid item key={event.uuid}>
                    <StyledCard sx={{ width: 345, m: '15px', borderRadius: '0px' }}>
                        <EventCard
                            id={event.uuid}
                            title={event.title}
                            desc={event.desc}
                            likes={event.likes}
                            onClick={() => handleEventClick(event.id)}
                        />
                        <LikeButton likes={event.likes} id = {event.uuid}/>
                    </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Background>
    );
}



export default EventGrid;
