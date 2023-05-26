import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)((theme) => ({
  transition: 'transform 0.15s ease-in-out',
  '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
}));

function EventCard(props) {
  const { id, url, title, desc } = props;

  return (
    <Link to={`/event/${id}`} style={{ textDecoration: 'none' }}>
      <StyledCard sx={{ width: 345, m: '15px', borderRadius: '0px' }}>
        <CardActionArea>
          {url && <CardMedia component="img" height="200" src={url} alt={title} />}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Link>
  );
}

export default EventCard;
