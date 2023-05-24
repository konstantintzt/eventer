import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from "@material-ui/core/styles"

import { theme } from '../Themes'

const StyledButton = styled(Button) ( theme => ({
    variant: 'outlined',
    disableElevation: true,
    color: '#000000',
    transition: "transform 0.15s fade",
    "&:hover": { 
        color: "#000000",
    },
}))

export default function LikeButton() {
  return (
    <ThemeProvider theme={theme}>
        <StyledButton>
            yeah
        </StyledButton>
    </ThemeProvider>
  );
}
