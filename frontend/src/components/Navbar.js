import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Select,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  FormControl
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Login from './LoginPopup';
import Logo from '../agrivimaan.png';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [location, setLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const YOUR_LOCATIONIQ_API_KEY = 'pk.6bb9a4c4497fbbd9cd8acb299226a0d5';

  // Open the login dialog
  const handleLoginOpen = () => {
    setLoginDialogOpen(true);
  };

  // Close the login dialog
  const handleLoginClose = () => {
    setLoginDialogOpen(false);
  };

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
            setDialogOpen(false)
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
        `https://us1.locationiq.com/v1/search.php?key=${YOUR_LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
          location
        )}&format=json`
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

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="bg-white h-20 " spacing="2px">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" style={{ width: 'auto', height: '40px', marginLeft: '10px' }} />
        </div>
        <Box width={100} />
        {/* Search Location */}
        <div className="ml-4">
          <Box
            display="flex"
            alignItems="center"
            borderRadius="md"
            border="1px solid #ccc"
            padding="20px"
            className="border border-gray-300 rounded px-3 py-2"
            onClick={() => {
              handleDialogOpen()
            }}
            width={300}
          >
            <LocationOnIcon />
            {/* Pop-up for Current Location */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Use Current Location</DialogTitle>
              <DialogContent>
                <Typography>Do you want to use your current location?</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleGetCurrentLocation();
                    handleDialogClose();
                  }}
                  color="primary"
                >
                  Yes
                </Button>
                <Button onClick={()=>{handleDialogClose ()} }color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Typography variant="body2" color="textSecondary" ml={1}>
              {currentLocation || 'Default Location'}
            </Typography>
          </Box>
        </div>
        <Box width={50}/>
        {/* Select Element */}
        <div className="ml-4">
          <FormControl variant="outlined" style={{ width: '300px' }}>
            <InputLabel htmlFor="drone-services-select">Drone Services</InputLabel>
            <Select
              label="Drone Services"
              value={selectedService}
              onChange={handleServiceChange}
              className="border border-gray-300 rounded px-2 py-1"
              inputProps={{
                name: 'drone-services',
                id: 'drone-services-select',
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value="" disabled>
                Select Drone Service
              </MenuItem>
              <MenuItem value="drone-spraying-services">
                <div style={{ display: 'flex', justifyContent: 'center' }}>Drone Spraying services</div>
              </MenuItem>
              <MenuItem value="drone-repairing-services">
                <div style={{ display: 'flex', justifyContent: 'center' }}>Drone Repairing services</div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Space */}
        <Box width={8} />

        {/* Login Button */}
        <div className="flex items-center ml-auto">
          <Button color="inherit" className="ml-2" onClick={handleLoginOpen}>
            Login
          </Button>
          <Button color="inherit" className="ml-2">
            Signup
          </Button>
        </div>
        {/* Login Popup */}
        <Login open={loginDialogOpen} onClose={handleLoginClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Button,
//   Select,
//   Box,
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Link,
// } from '@mui/material';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Login from './LoginPopup';
// import Logo from '../agrivimaan.png';

// const Navbar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [location, setLocation] = useState('');
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState('');
//   const [loginDialogOpen, setLoginDialogOpen] = useState(false);
//   const YOUR_LOCATIONIQ_API_KEY = 'pk.6bb9a4c4497fbbd9cd8acb299226a0d5';

//   // Open the login dialog
//   const handleLoginOpen = () => {
//     setLoginDialogOpen(true);
//   };

//   // Close the login dialog
//   const handleLoginClose = () => {
//     setLoginDialogOpen(false);
//   };

//   const handleLocationClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleLocationClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLocationChange = (newLocation) => {
//     setLocation(newLocation);
//     handleLocationClose();
//   };

//   const handleGetCurrentLocation = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           try {
//             const response = await fetch(
//               `https://us1.locationiq.com/v1/reverse.php?key=${YOUR_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
//             );
//             const data = await response.json();
//             const city = data.address.city || data.address.town || data.address.village || '';
//             const state = data.address.state || '';
//             setCurrentLocation(`${city}, ${state}`);
//           } catch (error) {
//             console.error('Error fetching location from coordinates', error);
//           }
//         },
//         (error) => {
//           console.error('Error getting user location', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <AppBar position="fixed">
//       <Toolbar className="bg-green-300 h-20 " spacing="2px">
//         {/* Logo */}
//         <div className="flex items-center">
//           <img src={Logo} alt="Logo" style={{ width: 'auto', height: '40px', marginLeft: '10px' }} />
//         </div>

//         {/* Select Element with Search Location and "Use Current Location" link */}
//         <div className="ml-4">
//           <Select
//             variant="outlined"
//             className="border border-gray-300 rounded px-8 py-1"
//             onClick={handleLocationClick}
//           >
//             <MenuItem>
//               <Box display="flex" alignItems="center">
//                 <LocationOnIcon />
//                 <Typography variant="body2" color="textSecondary" ml={1}>
//                   {currentLocation || 'Default Location'}
//                 </Typography>
//               </Box>
//             </MenuItem>
//             <MenuItem onClick={handleDialogOpen}>
//               <Link href="#" underline="none" color="inherit">
//                 Use Current Location
//               </Link>
//             </MenuItem>
//           </Select>
//         </div>

//         {/* Space */}
//         <Box width={8} />

//         {/* Login Button */}
//         <div className="flex items-center ml-auto">
//           <Button color="inherit" className="ml-2" onClick={handleLoginOpen}>
//             Login
//           </Button>
//           <Button color="inherit" className="ml-2">
//             Signup
//           </Button>
//         </div>

//         {/* Pop-up for "Use Current Location" link */}
//         <Dialog open={dialogOpen} onClose={handleDialogClose}>
//           <DialogTitle>Use Current Location</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Do you want to use your current location?
//               <br />
//               <Link
//                 href="#"
//                 underline="always"
//                 color="primary"
//                 onClick={() => {
//                   handleGetCurrentLocation();
//                   handleDialogClose();
//                 }}
//               >
//                 Yes, use my current location
//               </Link>
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleDialogClose} color="primary">
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Login Popup */}
//         <Login open={loginDialogOpen} onClose={handleLoginClose} />
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
