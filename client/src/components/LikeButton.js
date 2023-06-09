import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { API_URL } from '../utils'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite';

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
    margin: '5px',
    "&:hover": { 
        variant: 'contained',
        color: theme.palette.text.white,
        backgroundColor: theme.palette.red
    },

}))

export default function LikeButton({ id, likes, isLiked }) {

  const addLike = async(id) => {
    console.log("clicked" + id)
    const response = await fetch(API_URL+"like", {
      method: 'POST',
      body: JSON.stringify({ uuid: id, like : 1}),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    });
  
    const data = await response.json();
    if (response.ok) {
      // setSubmitted(true);
    } else {
      console.error('Failed to post event', data);
    }
    window.location.reload();
  };

  // const removeLike = async(id) => {
  //   console.log("clicked" + id)
  //   const response = await fetch('http://localhost:2902/like', {
  //     method: 'POST',
  //     body: JSON.stringify({ uuid: id, like : 0}),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     },
  //   });
  
  //   const data = await response.json();
  //   if (response.ok) {
  //     // setSubmitted(true);
  //   } else {
  //     console.error('Failed to post event', data);
  //   }
  //   window.location.reload();
  // };


  return (
      <StyledButton onClick = { () => addLike(id)} >
      {/* <StyledButton onClick = { () => isLiked ? removeLike(id) : addLike(id)} > */}
        { isLiked ? <FavoriteIcon sx={{ marginRight: '5px' }}/> : <FavoriteBorderIcon sx={{ marginRight: '5px' }}/> }
        {likes} { likes === 1 ? 'like' : 'likes' }
      </StyledButton>
  );
}
