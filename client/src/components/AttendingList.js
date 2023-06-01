import * as React from 'react';
import {List, ListItem, ListItemText, Box, Typography, Card, CardHeader} from '@mui/material';
import { styled } from '@mui/system';

// const StyledCardHeader = styled(CardHeader)((theme) => ({
//     backgroundColor: '#f50057',
//     // '&:hover': { transform: 'scale3d(1.02, 1.02, 1)' },
//   }));  

export default function BasicList({attendees}) {
  return (
    <Card height='1000px'>
        <CardHeader title="Attending"/>
        <List>
            {attendees.map((attendee) => (
                <ListItem variant="body1">
                    <ListItemText>{attendee.name}</ListItemText>
                </ListItem>
            ))}
        </List>
    </Card>
  );
}