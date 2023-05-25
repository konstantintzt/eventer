import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/system';

import LikeButton from './LikeButton.js'

const StyledCard = styled(Card)(( theme ) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
}))

function EventCard(props) {
  return (
    <StyledCard sx={{ width: 345, m: '15px', borderRadius: '0px' }}>
      <CardActionArea>
        { props.url && <CardMedia 
              component="img"
              height="200"
              src={props.url}
              alt={props.title}
          /> }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.desc}
          </Typography>
          <LikeButton />
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default EventCard;
