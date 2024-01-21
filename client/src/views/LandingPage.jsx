import React from 'react';
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import { Container, Grid, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" justifyItems="auto" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6}>
          <RegistrationForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
