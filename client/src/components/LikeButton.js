import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const StyledButton = styled(Button) ( ({theme}) => ({
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

export default function LikeButton({ likes, isLiked }) {
  return (
      <StyledButton>
        <FavoriteBorderIcon sx={{ marginRight: '5px' }}/> 
        {likes} likes
      </StyledButton>
  );
}
