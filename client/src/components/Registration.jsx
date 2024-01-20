import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', formData, { withCredentials: true });
      console.log(res)
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (err) {      
      const errorResponse = err.response.data.errors; // Get the errors from err.response.data
      const errorsObj = {};
      for (const key of Object.keys(errorResponse)) {
        errorsObj[key] = errorResponse[key].message;
      }
      setFormErrors(errorsObj);
    }};

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
