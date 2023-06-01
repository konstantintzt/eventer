import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const LoginButton = styled(Button) ( ({theme}) => ({
    textAlign: 'left',
    variant: 'outlined',
    color: theme.palette.red,
    borderColor: '#000000',
    border: 10,
    transition: "transform 0.15s fade",
    borderRadius: '40px',
    size: 'large',
    padding: '5px',
    width: '120px',
    "&:hover": { 
        variant: 'contained',
        color: theme.palette.text.white,
        backgroundColor: theme.palette.red
    },
}))