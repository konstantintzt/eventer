import React from 'react';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function EventCard(props) {
  const { id, title, desc } = props;

  return (
    <Link to={`/event/${id}`} style={{ textDecoration: 'none' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
            </CardContent>
          </CardActionArea>          
    </Link>
  );
}

export default EventCard;
