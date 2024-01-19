import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add logic to check if passwords match
      const response = await axios.post('http://localhost:8000/api/users/register', formData);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error.response.data); // Handle errors
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h6">Signup</Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField name="firstName" fullWidth label="First Name" margin="normal" onChange={handleChange} />
        <TextField name="lastName" fullWidth label="Last Name" margin="normal" onChange={handleChange} />
        <TextField name="email" fullWidth label="Email" margin="normal" onChange={handleChange} />
        <TextField name="password" fullWidth label="Password" type="password" margin="normal" onChange={handleChange} />
        <TextField name="confirmPassword" fullWidth label="Confirm Password" type="password" margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Create Account</Button>
      </Box>
    </Paper>
  );
};

export default RegistrationForm;
