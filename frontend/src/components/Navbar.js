import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [location, setLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');

  const YOUR_LOCATIONIQ_API_KEY = 'pk.6bb9a4c4497fbbd9cd8acb299226a0d5'

  const handleLocationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setAnchorEl(null);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    handleLocationClose();
  };

  const handleGetCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=${YOUR_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || '';
            const state = data.address.state || '';
            setCurrentLocation(`${city}, ${state}`);
          } catch (error) {
            console.error('Error fetching location from coordinates', error);
          }
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleLocationSubmit = async () => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${YOUR_LOCATIONIQ_API_KEY}&q=${encodeURIComponent(location)}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        console.log('Coordinates:', { lat, lon });
      }
    } catch (error) {
      console.error('Error fetching coordinates from address', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className="bg-green-300 justify-between mx-15">
      <div className="flex items-center">
  <Typography variant="h4" component="div" fontWeight="bold" fontStyle='Bold 700' >
    Agrivimaan
  </Typography>
</div>


        {/* Location Selector */}
        <div className='ml-64'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="location"
            onClick={handleLocationClick}
          >
            <LocationOnIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLocationClose}
          >
            <MenuItem onClick={handleDialogOpen}>Use Current Location</MenuItem>
            <MenuItem onClick={() => handleLocationChange('Location 1')}>New Dehli</MenuItem>
            <MenuItem onClick={() => handleLocationChange('Location 2')}>Karnataka</MenuItem>
            <MenuItem onClick={() => handleLocationChange('Location 3')}>West Bengal</MenuItem>
            
          </Menu>
        </div>

          
          {currentLocation && (
          <Typography variant="body2" color="inherit">
            {currentLocation}
          </Typography>
        )}

        {/* Search Bar */}
        <div className="ml-auto">
          <div className="flex items-center bg-white p-2 rounded-full">
            <SearchIcon className="text-gray-500" />
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="ml-2 w-140"
            />
            <Button color="inherit" onClick={handleLocationSubmit}>
              Search
            </Button>
          </div>
        </div>

      

        {/* Login and Signup Buttons */}
        <div className="flex items-center">
          <Button color="inherit" className="ml-2">
            Login
          </Button>
          <Button color="inherit" className="ml-2">
            Signup
          </Button>
        </div>

        {/* Dialog for Current Location */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Use Current Location</DialogTitle>
          <DialogContent>
            <Typography>Do you want to use your current location?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => { handleGetCurrentLocation(); handleDialogClose(); }} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
