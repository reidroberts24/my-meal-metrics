import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/login', formData, { withCredentials: true });
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        setFormErrors({ general: 'An error occurred. Please try again later.' });
      }
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
          error={!!formErrors.email}
          helperText={formErrors.email ? formErrors.email.message : ''}
        />
        <TextField 
          name="password" 
          fullWidth 
          label="Password" 
          type="password" 
          margin="normal" 
          onChange={handleChange} 
          error={!!formErrors.password}
          helperText={formErrors.password ? formErrors.password.message : ''}
        />
        {formErrors.general && <p>{formErrors.general}</p>}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Sign In</Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
