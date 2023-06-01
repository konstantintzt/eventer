import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 3, 1, 6.3),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ handleSearchSubmit }) {
  const [searchValue, setSearchValue] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => handleMenuClose('')}
          >
            <MenuItem component={Link} to="/event-post" onClick={handleMenuClose}>Post An Event</MenuItem>
            <MenuItem component={Link} to="/event/8fc1e95c-3ce5-4167-a75d-3accc5403c1c" onClick={handleMenuClose}>Editor Pick</MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}> Login </MenuItem>
          </Menu>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Button color="inherit" onClick={() => { window.location.reload() }} sx={{
              fontSize: '20px', marginTop: '2px'
            }}>
              Eventer
            </Button>
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/event-post">
            Post
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder=""
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search>
          <Button color="inherit" onClick={() => handleSearchSubmit(searchValue)}>
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
