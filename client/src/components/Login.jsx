import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', formData, { withCredentials: true });
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error.response.data); // Handle errors
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h6">Login</Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField name="email" fullWidth label="Email" margin="normal" onChange={handleChange} />
        <TextField name="password" fullWidth label="Password" type="password" margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Sign In</Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
