import * as React from 'react';
import {List, ListItem, ListItemText, Card, CardHeader, Divider, Button, Typography} from '@mui/material';
import { styled } from '@mui/system';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

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

export default function BasicList({attendees, clickfunc, isAttending}) {
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
        { attendee.profile ?
          <Avatar sx={{ marginRight: '10px' }} src={attendee.picture} /> :
          <Avatar sx={{ marginRight: '10px' }} src="https://i.stack.imgur.com/34AD2.jpg" />
        }
        { isAttending ? 
        <StyledButton onClick = {clickfunc}>
          <GroupAddIcon sx={{ marginRight: '5px' }}/>
          I'm attending!
        </StyledButton> :
        <StyledButton onClick = {clickfunc}>
          <GroupAddOutlinedIcon sx={{ marginRight: '5px' }}/>
          Not attending
        </StyledButton>
        }
    </Card>
  );
}