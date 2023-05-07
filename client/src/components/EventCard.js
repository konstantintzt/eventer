import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function EventCard(props) {
  return (
    <Card sx={{ maxWidth: 345, height: 300 }}>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EventCard;
