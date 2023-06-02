import * as React from 'react';
import {List, ListItem, ListItemText, Card, CardHeader, Divider, Button, Typography} from '@mui/material';
import { styled } from '@mui/system';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const StyledButton = styled(Button)(({theme}) => ({
  height: '100%',
  width: '100%',
  borderRadius: '0px',
  padding: '15px',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': { 
  },
}));

const StyledTypography = styled(Typography)(({theme}) => ({
  color: theme.palette.primary.main,
}));

const StyledCardHeader = styled(CardHeader)(({theme}) => ({
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

function capitalizeString (str) {
  return str.toLowerCase().replace(/\w{3,}/g, (match) => match.replace(/\w/, (m) => m.toUpperCase()));
};

export default function BasicList({attendees, clickfunc}) {
  return (
    <Card>
        <StyledCardHeader title="Attending"/>
        <List sx={{height: '300px', overflow: 'auto'}}>
            {attendees.map((attendee) => (
              <div>
                <ListItem variant="body1">
                  { attendee.name ?
                    <ListItemText primary={capitalizeString(attendee.name)} /> :
                    <ListItemText
                    disableTypography
                    primary={<StyledTypography>Anonymous Attendee</StyledTypography>}
                    />}
                </ListItem>
                <Divider variant='middle'/>
              </div>
            ))}
        </List>
        <Divider />
        <StyledButton onClick = {clickfunc}>
          <GroupAddIcon sx={{ marginRight: '10px' }}/>
          I'm attending!
        </StyledButton>
    </Card>
  );
}