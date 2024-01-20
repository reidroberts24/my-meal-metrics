import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset error message for the field
    setErrorMessages({ ...errorMessages, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', formData, { withCredentials: true });
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error(error.response.data); // Log errors
      // Update error messages state based on response from the server
      const errors = error.response.data;
      setErrorMessages({
        email: errors.email || '',
        password: errors.password || '',
      });
    }
  };


  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h6">Login</Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          name="email" 
          fullWidth 
          label="Email" 
          margin="normal" 
          onChange={handleChange} 
          error={Boolean(errorMessages.email)} 
          helperText={errorMessages.email}
        />
        <TextField 
          name="password" 
          fullWidth 
          label="Password" 
          type="password" 
          margin="normal" 
          onChange={handleChange} 
          error={Boolean(errorMessages.password)} 
          helperText={errorMessages.password}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Sign In</Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
