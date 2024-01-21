import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated

  const handleLogout = () => {
    axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {location.pathname === '/' ? 'Welcome to MyMealMetrics!' : 'My Dashboard'}
        </Typography>
        {location.pathname !== '/' && (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
