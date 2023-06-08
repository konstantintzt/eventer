import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import Grid from '@mui/material/Grid';
import Background from '../components/Background';
import LikeButton from '../components/LikeButton';
import Masonry from '@mui/lab/Masonry';
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
    
    console.log("generating " + events)
    return (
        <Background>
            <Grid container rowSpacing={1} margin="auto">
              <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={0} loading="lazy">
                {(events.length > 0) && events.map((event) => (
                    <Grid item key={event.uuid} margin='auto'>
                      <StyledCard sx={{ m: '15px', borderRadius: '0px' }}>
                          <EventCard
                              id={event.uuid}
                              title={event.title}
                              desc={event.desc}
                              likes={event.likes}
                              image={event.banner}
                              onClick={() => handleEventClick(event.id)}
                          />
                          <LikeButton likes={event.likes} id = {event.uuid} isLiked={event.liked}/>
                      </StyledCard>
                    </Grid>
                ))}
                </Masonry>
            </Grid>
        </Background>
    );
}



export default EventGrid;
