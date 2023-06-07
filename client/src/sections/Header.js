import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material';
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
import SortIcon from '@mui/icons-material/Sort';
import DatePicker from 'react-datepicker';
import Popup from 'reactjs-popup';
import { TextField, Card, CardContent, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import 'reactjs-popup/dist/index.css';

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

export default function SearchAppBar({ handleSearchSubmit,  handleRecommend }) {
  const [searchValue, setSearchValue] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [beforeDate, setBeforeDate] = useState(null);
  const [afterDate, setAfterDate] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [type, setType] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose('/');
    window.location.reload();
  };

  const handleMenuClose = (path) => {
    setMenuAnchor(null);
    console.log('path', path);
    console.log('token', localStorage.getItem('token'));
    if (path === '/event-post') {
      navigate('/');
    } else {
      navigate(path);
    }
  };

  const menuStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="primary">
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
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem component={Link} to="/event-post" onClick={() => handleMenuClose('/event-post')}>
              Post An Event
            </MenuItem>
            <MenuItem component={Link} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Button color="inherit" onClick={() => { 
              localStorage.setItem("homeState", "search")
              localStorage.setItem("currentQuery", "")
              window.location.reload(); 
              }} sx={{ fontSize: '20px', marginTop: '2px' }}>
              Eventer
            </Button>
          </Typography>
          <Button color="inherit" onClick={() => handleRecommend()}>
                                Recommend
                            </Button>
          <Button color="inherit" component={Link} to="/event-post" onClick={() => handleMenuClose('/event-post')}>
            Post
          </Button>
          <Popup
            trigger={
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <SortIcon />
              </IconButton>
            }
            modal
            nested
          >
            {(close) => (
              <Card>
                <CardContent>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel></InputLabel>
                    <Select
                      options={[
                        { value: 1, label: 'Concert' },
                        { value: 2, label: 'Play' },
                        { value: 3, label: 'Movie Screening' },
                        { value: 4, label: 'Sports Game' },
                        { value: 5, label: 'Party' },
                      ]}
                      value={type}
                      onChange={(selectedOption) => setType(selectedOption)}
                      styles={menuStyles}
                    />
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Before Date"
                    type="date"
                    name="date"
                    value={afterDate}
                    onChange={(e) => { console.log(e); setAfterDate(e.target.value) }}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="After Date"
                    type="date"
                    name="date"
                    value={beforeDate}
                    onChange={(e) => { setBeforeDate(e.target.value) }}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Event ZIP"
                    name="zip"
                    value={zipCode}
                    onChange={(e) => { setZipCode(e.target.value) }}
                    required
                    inputProps={{
                      pattern: '\\d{5}',
                    }}
                    sx={{ mb: 2 }}
                  />

                </CardContent>
              </Card>
            )}
          </Popup>
          {/* <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <DatePicker selected={startDate} onChange={(date) => setBeforeDate(date)} />
          </div> */}

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
          <Button color="inherit" onClick={() => handleSearchSubmit(searchValue, beforeDate, afterDate, zipCode, type)}>
            Search
          </Button>


        </Toolbar>
      </AppBar>
    </Box>
  );
}
