import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  Box,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  FormControl,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import Login from "./LoginPopup";
import Logo from "../agrivimaan.png";
import Register from "./RegisterPopup";

const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const YOUR_LOCATIONIQ_API_KEY = "pk.6bb9a4c4497fbbd9cd8acb299226a0d5";

  const handleLoginOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleRegisterOpen = () => {
    setRegisterDialogOpen(true);
  };

  const handleLoginClose = () => {
    setLoginDialogOpen(false);
  };

  const handleRegisterClose = () => {
    setRegisterDialogOpen(false);
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
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";
            const state = data.address.state || "";
            setCurrentLocation(`${city}, ${state}`);
            setDialogOpen(false)
          } catch (error) {
            console.error("Error fetching location from coordinates", error);
          }
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "auto", height: "40px", marginLeft: "10px" }}
          />
        </div>
        <Box width={100} />
        <div className="ml-4">
          <Box
            display="flex"
            alignItems="center"
            borderRadius="md"
            border="1px solid #ccc"
            padding="20px"
            className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
            onClick={handleDialogOpen}
            width={300}
          >
            <LocationOnIcon style={{ color: 'black' }} />
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Use Current Location</DialogTitle>
              <DialogContent>
                <Typography>
                  Do you want to use your current location?
                </Typography>
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
              {currentLocation || "Default Location"}
            </Typography>
          </Box>
        </div>
        <Box width={50} />
        <div className="ml-4">
          <FormControl variant="outlined" style={{ width: "300px" }}>
            <InputLabel htmlFor="drone-services-select">
              Drone Services
            </InputLabel>
            <Select
              label="Drone Services"
              value={selectedService}
              onChange={handleServiceChange}
              className="border border-gray-300 rounded px-2 py-1"
              inputProps={{
                name: "drone-services",
                id: "drone-services-select",
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value="" disabled>
                Select Drone Service
              </MenuItem>
              <MenuItem value="drone-spraying-services">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  Drone Spraying services
                </div>
              </MenuItem>
              <MenuItem value="drone-repairing-services">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  Drone Repairing services
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <Box width={8} />
        <div className="flex items-center ml-auto">
          <Button color="inherit" className="ml-2" onClick={handleLoginOpen}>
            Login
          </Button>
          <Button color="inherit" className="ml-2" onClick={handleRegisterOpen}>
            Signup
          </Button>
        </div>
        <Login open={loginDialogOpen} onClose={handleLoginClose} />
        <Register open={registerDialogOpen} onClose={handleRegisterClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
