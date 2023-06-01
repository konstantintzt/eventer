import * as React from 'react';
import {List, ListItem, ListItemText, Card, CardHeader, Divider, Button} from '@mui/material';
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

const StyledCardHeader = styled(CardHeader)(({theme}) => ({
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

export default function BasicList({attendees, clickfunc, isAttending}) {
  return (
    <Card>
        <StyledCardHeader title="Attending"/>
        <List sx={{height: '300px', overflow: 'auto'}}>
            {attendees.map((attendee) => (
              <div>
                <ListItem variant="body1">
                    <ListItemText>{attendee.name}</ListItemText>
                </ListItem>
                <Divider variant='middle'/>
              </div>
            ))}
        </List>
        <Divider />
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