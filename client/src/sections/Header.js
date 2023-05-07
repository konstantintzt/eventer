import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function Header() {
    return (
      <>
        <Typography variant="h1">
            eventer.
        </Typography>
        <Typography variant="h3">
            Discover LA
        </Typography>
      </>
    );
  }
  
  export default Header;